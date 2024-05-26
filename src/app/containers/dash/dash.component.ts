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
  searchTerm:string='';
  filteredNavData:any[]=[];

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

          if(this.user.role==="admin"  ){
            this.navData = [
              { label: 'Dashboard', url: '/dashboard', icon: 'fa-solid fa-house icon' },
              { label: 'DailyPass', url: '/dailypass/dailypass', icon: 'fa-solid fa-ticket icon' },
              // { label: 'Resultat' , url:'/Resultat/Resultat' , icon:'fa-solid fa-check-circle icon'},
              { label: 'Profile', url: '/Profile/profile', icon: 'fa-solid fa-user-check icon' },

            ];
          }else if(this.user.role==="adminGlobal"){
            this.navData = [
              { label: 'Statistic', url: '/AdminGlobal/adminGlobal', icon: 'fa-solid fa-chart-pie icon' },
              { label: 'Profile', url: '/Profile/profile', icon: 'fa-solid fa-user-check icon' },

            ];
            this.pageTitle='Statistic';
            
          }
          else if(this.user.role==="responsable"){
            this.navData = [
              { label: 'Dashboard', url: '#', icon: 'fa-solid fa-house icon' },
              { label: 'DailyPass', url: '/dailypass/dailypass', icon: 'fa-solid fa-ticket icon' },
              // { label: 'Resultat' , url:'/Resultat/Resultat' , icon:'fa-solid fa-check-circle icon'},
              { label: 'Profile', url: '/Profile/profile', icon: 'fa-solid fa-user-check icon' },

            ];
          
            
          }
          else{
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
    const modeSwtich = this.el.nativeElement.querySelector(".toggle-switch");
    const modeText = this.el.nativeElement.querySelector(".mode-text");
    // const searchBtn = this.el.nativeElement.querySelector(".search-box");

    
    //
    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("close");
    });


    //Dark && Light Mode
    modeSwtich.addEventListener("click", () => {
      body.classList.toggle("dark");
      if(body.classList.contains("dark")){
           modeText.innerText="Light Mode"
      }else{
        modeText.innerText="Dark Mode"

      }
    });


  }

/*------------------------searche----------------------------*/
  filterNavData(): any[] {
    if (this.searchTerm.trim() === '') {
      return this.navData;
    } else {
      return this.navData.filter(data => data.label.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
  }
  //recherche par label
onSearch(): void {
  if (this.searchTerm.trim() === '') {
    this.filteredNavData = this.navData;
  } else {
    const searchTermLowerCase = this.searchTerm.toLowerCase();
    this.filteredNavData = this.navData.filter(data => data.label.toLowerCase().startsWith(searchTermLowerCase));
  }
}
/*---------------------------------------------------------*/

  
  //Log Out
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
