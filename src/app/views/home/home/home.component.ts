import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  activeTab: string = 'tracking'; // Initialise avec 'tracking'
ngOnInit(): void {
    
}
  // ngOnInit(): void {
    
  //   const icon = document.getElementById("icon") as HTMLImageElement;
  //   if (icon) {
  //     icon.onclick = function () {
  //       document.body.classList.toggle("dark-theme");
  //       document.body.classList.toggle("light-theme");
  //       if (document.body.classList.contains("dark-theme")) {
  //         icon.src = "../assets/img/sun.png";
  //       } else {
  //         icon.src = "../assets/img/moon.png"; 
  //       }
  //     }
  //   }
  // }
  
  opentab(tabname: string, event?: Event) {
    const tablinks = document.getElementsByClassName("tab-links");
    const tabcontents = document.getElementsByClassName("tab-contents");

    for (let tablink of Array.from(tablinks)) {
      (tablink as HTMLElement).classList.remove("active-link");
    }
    for (let tabcontent of Array.from(tabcontents)) {
      (tabcontent as HTMLElement).classList.remove("active-tab");
    }
    if (event?.target instanceof HTMLElement) {
      event.target.classList.add("active-link");
    }
    for (let tabcontent of Array.from(tabcontents)) {
      (tabcontent as HTMLElement).classList.remove("active-tab");
    }
    const tabContentToShow = document.getElementById(tabname);
    if (tabContentToShow) {
      tabContentToShow.classList.add('active-tab');
    }
    this.activeTab = tabname;

  }

  openmenu(){
    const sidemenu = document.getElementById("sidemenu");
    if (sidemenu) {
        sidemenu.style.right = "0";
    }
  }
  closemenu(){
    const sidemenu = document.getElementById("sidemenu");
    if (sidemenu) {
        sidemenu.style.right = "-200px";
    }
  }

}
