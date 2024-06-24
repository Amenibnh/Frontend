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
        if (port === '4200') {
          baseUrl = 'http://gabes.localhost:4200';
        } else if (port === '4400') {
          baseUrl = 'http://medenine.localhost:4400';
        } else if (port === '4300') {
          baseUrl = 'http://ariana.localhost:4300';
        } else if (port === '4500') {
          baseUrl = 'http://beja.localhost:4500';
        } else if (port === '4600') {
          baseUrl = 'http://benarous.localhost:4600';
        } else if (port === '4700') {
          baseUrl = 'http://bizerte.localhost:4700';
        } else if (port === '4800') {
          baseUrl = 'http://gafsa.localhost:4800';
        } else if (port === '4900') {
          baseUrl = 'http://jendouba.localhost:4900';
        } else if (port === '5000') {
          baseUrl = 'http://kairouan.localhost:5000';
        } else if (port === '5100') {
          baseUrl = 'http://kasserine.localhost:5100';
        } else if (port === '5200') {
          baseUrl = 'http://kebili.localhost:5200';
        } else if (port === '5300') {
          baseUrl = 'http://lekef.localhost:5300';
        } else if (port === '5400') {
          baseUrl = 'http://mahdia.localhost:5400';
        } else if (port === '5500') {
          baseUrl = 'http://lamanouba.localhost:5500';
        } else if (port === '5600') {
          baseUrl = 'http://monastir.localhost:5600';
        } else if (port === '5700') {
          baseUrl = 'http://nabeul.localhost:5700';
        } else if (port === '5800') {
          baseUrl = 'http://sfax.localhost:5800';
        } else if (port === '5900') {
          baseUrl = 'http://sidibouzid.localhost:5900';
        } else if (port === '6000') {
          baseUrl = 'http://siliana.localhost:6000';
        } else if (port === '6100') {
          baseUrl = 'http://sousse.localhost:6100';
        } else if (port === '6200') {
          baseUrl = 'http://tataouine.localhost:6200';
        } else if (port === '6300') {
          baseUrl = 'http://tozeur.localhost:6300';
        } else if (port === '6400') {
          baseUrl = 'http://tunis.localhost:6400';
        } else if (port === '6500') {
          baseUrl = 'http://zaghouan.localhost:6500';
        }else if (port === '4000') {
          baseUrl = 'http://adminGlobal.localhost:4000';
        } else{
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