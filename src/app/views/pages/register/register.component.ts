import { RegisterService } from './register.service'
import { Router } from '@angular/router'; // Import the Router module
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('container') container!: any;
  @ViewChild('form1') form1!: NgForm;
  @ViewChild('form2') form2!: NgForm;
  @ViewChild('form3') form3!: NgForm;
  @ViewChild('form4') form4!: NgForm;

  firstname: string = ""
  lastname:string=""
  email: string = ""
  address:string=""
  country:string=""
  phone:string=""
  gender:string=""
  password: string = ""
  repeatpassword: string = ""
  disabilityType:string=""
  errMessage: string = ""
  errorbool: boolean = false;
  
  constructor(private apiservice: RegisterService, private router: Router) { }



  ngOnInit(): void { }

  next(form: NgForm) {
    if (form.valid) {
     
        this.container.nativeElement.style.left = '-1%';
        this.errorbool = false;
      
    } else {
      this.errorbool = true;
      this.errMessage = "Please fill in all the required fields.";
    }
  }
  /*---------------Sign Up----------------- */

  register() {
    //reg expression
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    this.errMessage = "";
    this.errorbool = false;
    //async validator 
    if (this.firstname == "") {
      this.errorbool = !this.errorbool
      this.errMessage = "Username is empty"
      console.log(this.errMessage)

    }else if (this.lastname == "") {
      this.errorbool = !this.errorbool
      this.errMessage = "lastname is empty"
      console.log(this.errMessage)

    } else if (this.email == "") {
      this.errorbool = !this.errorbool
      this.errMessage = "email is empty"
      console.log(this.errMessage)

    } else if (!emailRegex.test(this.email)) {
      this.errorbool = !this.errorbool
      this.errMessage = "invalid email "
      console.log(this.errMessage)
    }else if (this.address == "") {
      this.errorbool = !this.errorbool
      this.errMessage = "Address is empty"
      console.log(this.errMessage)

    }else if (this.disabilityType == "") {
      this.errorbool = !this.errorbool
      this.errMessage = "disabilityType is empty"
      console.log(this.errMessage)

    }else if (this.country == "") {
      this.errorbool = !this.errorbool
      this.errMessage = "Please select your country";
      console.log(this.errMessage)

    }else if (this.phone == "") {
      this.errorbool = !this.errorbool
      this.errMessage = "Phone is empty";
      console.log(this.errMessage)

    }else if (this.gender == "") {
      this.errorbool = !this.errorbool
      this.errMessage = "Gender is empty";
      console.log(this.errMessage)
    }else if (this.password == "") {
      this.errorbool = !this.errorbool
      this.errMessage = "Password is empty"
      console.log(this.errMessage)
    } else if (this.repeatpassword == "") {
      this.errorbool = !this.errorbool
      this.errMessage = "repeatpassword is empty"
      console.log(this.errMessage)
    } else if (this.password != this.repeatpassword) {
      this.errorbool = !this.errorbool
      this.errMessage = "Password doesn't match!"
      console.log(this.errMessage)
    }else {
      this.apiservice.register(this.firstname, this.lastname, this.email, this.address, this.country, this.password, this.repeatpassword,this.phone,this.gender,this.disabilityType).subscribe((Response: any) => {
       
        // Use the router to navigate to the login
        this.router.navigate(['/login']);
        // Afficher la réponse en cas de succès 
        console.log(Response)
      }, (err: any) => {
        // Afficher l'erreur en cas d'échec
        console.log(err.error.message)
        this.errMessage = err.error.message
        this.errorbool = !this.errorbool;
      })

    }
    }
}
  


 



 