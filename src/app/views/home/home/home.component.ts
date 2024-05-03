import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  activeTab: string = 'tracking'; // Initialise avec 'tracking'
// ngOnInit(): void {
//   var form=document.querySelector(".contact-right form") as HTMLFormElement | null;
//   var message=document.getElementById("msg");
//   var submitButton=form?.querySelector(".btn.btn2");

//   submitButton?.addEventListener("click",function(event){
//     event.preventDefault();
//     if(form && message){
//       if(validateForm(form)){
//         message.style.display="block";
//         form.reset();
//       }else{
//         alert("Please fill in all fields before submitting.")
//       }
      
//     }
    
//   })
// }
  ngOnInit(){}
  
  
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
// function validateForm(form: HTMLFormElement): boolean {
//   var inputs = form.querySelectorAll("input, textarea");
//   for (var i = 0; i < inputs.length; i++) {
//     if ((inputs[i] as HTMLInputElement).value.trim() === "") {
//       return false;
//     }
//   }
//   return true;
// }
