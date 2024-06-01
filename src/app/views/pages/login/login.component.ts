import { Component } from '@angular/core';
import {LoginService} from './login.service'
import { Router } from '@angular/router'; // Import the Router module

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
email:string=""
password: string=""
subdomain: string=""
errMessage:string=""
errorbool:boolean=false;

  //creer une instance du service 'LoginService' et la rend accessible à la classe  en la stockant dans 'apiservice'
  constructor(private apiservice :LoginService, private router:Router ) { }

    //lors de connexion c'est la 1er methode qui fonctionne
    ngOnInit(){ }
    
  // Affiche l'email ds le console 
  test()
  {
  console.log(this.email);
  }

  //Authentification
  login()
  {
    //reg expression
  const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

    this.errMessage = "";
    this.errorbool = false;

if(this.email=="" ){
  this.errorbool = !this.errorbool
  this.errMessage = "email is empty"
  console.log(this.errMessage)

}else if( !emailRegex.test(this.email)){
  this.errorbool = !this.errorbool
  this.errMessage = "invalid email "
  console.log(this.errMessage)
}else if (this.password==""){
      this.errorbool = !this.errorbool
      this.errMessage = "Password is empty"
      console.log(this.errMessage)
    // else if(this.password.length<8){
    //   this.errorbool = !this.errorbool
    //   this.errMessage = "Password length must be >= 8"
    //   console.log(this.errMessage)
    // }
}else{
      this.apiservice.login(this.email,this.password).subscribe((Response:any)=>{
        const token=Response.token;
        // Enregistrement de token de l'utilisateur(local stotage)
        localStorage.setItem('token', token);
        
        if(Response.role === "admin" || Response.role === "responsable"){
        // Save user details in local storage
        // localStorage.setItem('user', JSON.stringify(Response.user));

        // const token=Response.token;
        // Enregistrement de token de l'utilisateur(local stotage)
        // localStorage.setItem('token', token);

        // Afficher la réponse en cas de succès 
        console.log(Response)

        // Use the router to navigate to the dashboard
        this.router.navigate(['/dashboard']);
        
        }else if(Response.role === "adminGlobal" ){

          this.router.navigate(['/adminGlobal']).then(() => {
            // Redirection vers le contenu du tableau de bord dans le module AdminGlobalModule
            this.router.navigate(['/AdminGlobal/adminGlobal']);
          });
        }else if( Response.role==="user"){
          this.router.navigate(['/Profile/profile']);

        }else{
        // this.errMessage ="unauthorized"
        // this.errorbool = !this.errorbool;
        this.router.navigate(['/login'])
        }
      },(err:any)=>{
        // Afficher l'erreur en cas d'échec
        console.log(err.error.message)
        this.errMessage = err.error.message
        this.errorbool = !this.errorbool;
      } )

   
    }
  }
  

}