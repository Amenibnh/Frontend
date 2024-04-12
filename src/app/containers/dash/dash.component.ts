import { Component, OnInit, ElementRef } from '@angular/core';
import { DashService } from './dash.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import{navbarData} from './nav-data'

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
})
export class DashComponent implements OnInit {
  user: any  = '';
  navData=navbarData;
  pageTitle:string='Dashboard';
  constructor(
    private el: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private headerService: DashService
  ) {}

  ngOnInit(): void {
    
  
    /**---------- */
    this.route.paramMap.subscribe((params) => {
      this.headerService.getLoggedInUser().subscribe(
        (response) => {
          this.user = response.user;
          // console.log(this.user);
          // console.log(this.user.profileImage);
          if(this.user.role==="admin"){
            this.navData = [
              { label: 'Dashboard', url: '/dashboard', icon: 'fa-solid fa-house icon' },
              { label: 'DailyPass', url: '/dailypass/dailypass', icon: 'fa-solid fa-ticket icon' },
              { label: 'Repa', url: '/repas/repa', icon: 'fa-solid fa-utensils icon' },
              { label: 'Users', url: '/users/user', icon: 'fa-solid fa-users icon' },
              { label: 'Profile', url: '/Profile/profile', icon: 'fa-solid fa-user-check icon' },
            ];
          }else{
            this.navData=[
              { label: 'Profile', url: '/Profile/profile', icon: 'fa-solid fa-user-check icon' },
            ];
            this.pageTitle='Profile';
          }
          this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
              const currentRoute = this.navData.find(data => data.url === event.urlAfterRedirects);
              this.pageTitle = currentRoute ? currentRoute.label : 'Dashboard';
            }
          });
        },
        (error) => {
          console.error(error);
        }
      );
    });
    
    
    const body = this.el.nativeElement.querySelector("body");
    const sidebar = this.el.nativeElement.querySelector(".sidebar");
    const toggle = this.el.nativeElement.querySelector(".toggle");
    const searchBtn = this.el.nativeElement.querySelector(".search-box");
    const modeSwtich = this.el.nativeElement.querySelector(".toggle-switch");
    const modeText = this.el.nativeElement.querySelector(".mode-text");
    // const modeToggle = this.el.nativeElement.querySelector('.mode-toggle');
    // const sidebar = this.el.nativeElement.querySelector('nav');
    // const sidebarToggle =this.el.nativeElement.querySelector('.sidebar-toggle');

    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("close");
    });

    modeSwtich.addEventListener("click", () => {
      body.classList.toggle("dark");
      if(body.classList.contains("dark")){
           modeText.innerText="Light Mode"
      }else{
        modeText.innerText="Dark Mode"

      }
    });

    // let getMode = localStorage.getItem('mode');
    // if (getMode && getMode === 'dark') {
    //   body.classList.toggle('dark');
    // }

    // let getStatus = localStorage.getItem('status');
    // if (getStatus && getStatus === 'close') {
    //   sidebar.classList.toggle('close');
    // }

    // modeToggle.addEventListener('click', () => {
    //   body.classList.toggle('dark');
    //   if (body.classList.contains('dark')) {
    //     localStorage.setItem('mode', 'dark');
    //   } else {
    //     localStorage.setItem('mode', 'light');
    //   }
    // });

    // sidebarToggle.addEventListener('click', () => {
    //   sidebar.classList.toggle('close');
    //   if (sidebar.classList.contains('close')) {
    //     localStorage.setItem('status', 'close');
    //   } else {
    //     localStorage.setItem('status', 'open');
    //   }
    // });

  }
  logoutUser(): void {
    this.headerService.logoutUser().subscribe(
      (response) => {
        // Supprimer le token du localStorage
        localStorage.removeItem('token');

        console.log('Token supprimé');

        // Naviguer vers la page de connexion (login)
        this.router
          .navigate(['/login'])
          .then(() => {
            console.log('Redirection vers la page de connexion réussie');
          })
          .catch((error) => {
            console.error(
              'Erreur lors de la redirection vers la page de connexion :',
              error
            );
          });
      },
      (error) => {
        console.error(error);
      }
    );
  }


}
