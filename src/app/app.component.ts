 import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'CareLoveAssist';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        const subdomain = this.extractSubdomain();
        console.log('Subdomain:', subdomain);
        
        // Get the port number from window.location
        const port = window.location.port;

        // Determine the base URL based on the port
        let baseUrl = '';
        if (port === '4400') {
          baseUrl = 'http://gabes.localhost:4400';
        } else if (port === '4200') {
          baseUrl = 'http://medenine.localhost:4200';
        }else{
          baseUrl = 'http://localhost:4200/404';
        }

        // Redirect if subdomain is missing
        if (!subdomain) {
          window.location.href = baseUrl + window.location.pathname + window.location.search;
        }
      }
    });
  }

  private extractSubdomain(): string {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    // Check if there is a subdomain (at least 2 parts)
    if (parts.length >= 2) {
      // Return the first part as the subdomain
      return parts[0];
    } else {
      // No subdomain
      return '';
    }
  }
}