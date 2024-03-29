import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from './reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  password: string = '';
  repeatpassword: string = '';
  errMessage: string = '';
  errorbool: boolean = false;

  constructor(
    private resetPasswordService: ResetPasswordService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  resetPassword() {
    if (this.password == '') {
      this.errorbool = true;
      this.errMessage = 'Password is empty';
    } else if (this.repeatpassword == '') {
      this.errorbool = true;
      this.errMessage = 'Repeat password is empty';
    } else if (this.password != this.repeatpassword) {
      this.errorbool = true;
      this.errMessage = 'Passwords do not match';
    } else {
      this.resetPasswordService.resetPassword(this.token, this.password).subscribe(
        (response: any) => {
          this.router.navigate(['/login']);
          console.log(response);
        },
        (err: any) => {
          console.log(err.error.message);
          this.errMessage = err.error.message;
          this.errorbool = true;
        }
      );
    }
  }
}
