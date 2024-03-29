import { Component } from '@angular/core';
import { ForgetPasswordService } from './forget-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {

  email: string = '';
  errMessage: string = '';
  errorbool:boolean=false;
  successMessage: string = '';

  constructor(private forgetPasswordService: ForgetPasswordService, private router:Router) { }
  ngOnInit():void
  {
  
  }
  forgotpassword() {
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    this.errMessage = "";
    this.errorbool = false;
    
    if(this.email=="" ){
      this.errorbool = !this.errorbool
      this.errMessage = "Please enter your email address."
      console.log(this.errMessage)
    
    }else if( !emailRegex.test(this.email)){
      this.errorbool = !this.errorbool
      this.errMessage = "invalid email "
      console.log(this.errMessage)
    }else{

    this.forgetPasswordService.forgotpassword(this.email).subscribe(
      (response) => {
        this.router.navigate(['/login']);
        console.log(response);
        this.successMessage = response.message;      },
      (error) => {
        console.error(error);
        this.errMessage = 'An error occurred while processing your request.';
      }
    );
  }
  }
}
