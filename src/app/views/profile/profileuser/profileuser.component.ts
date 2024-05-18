import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileuserService } from './profileuser.service';
import { DomSanitizer, SafeUrl, } from '@angular/platform-browser';
import * as QRCode from 'angularx-qrcode';
// import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-profileuser',
  templateUrl: './profileuser.component.html',
  styleUrls: ['./profileuser.component.css']
})
export class ProfileuserComponent implements OnInit {

  user: any = null; // fetching user
  errMessage: string = '';
  message: string = '';
  qrCodeDownloadLink: SafeUrl = "";




  constructor(private route: ActivatedRoute,
    private profileService: ProfileuserService,
    private router: Router,
    private sanitizer: DomSanitizer,
   ) { }




  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      this.profileService.getLoggedInUser().subscribe(
        (response) => {
          this.user = response.user;
          this.generateQrCode();

          console.log(this.user);
        },
        (error) => {
          console.error(error);
        }
      );

    });
  }
  generateQrCode() {
    if (this.user && this.user.qrdata) {
      this.qrCodeDownloadLink = this.sanitizer.bypassSecurityTrustUrl(this.user.qrdata);
    }
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.user.profileImage = file;
  }


  updateProfile(event: any) {
    //reg expression
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

    event.preventDefault();
    if (!this.user.firstname) {
      this.errMessage = "Please add your name.";
      return; // Stop execution if any required field is empty
    } else if (!this.user.email) {
      this.errMessage = "Please add your email.";
      return;
    } else if (!emailRegex.test(this.user.email)) {
      this.errMessage = "Please entre a valid email  "
      console.log(this.errMessage)
    } else if (!this.user.phone) {
      this.errMessage = "Please add your phone.";
      return;
    } else {
      const formData = new FormData()
      formData.append("firstname", this.user.firstname);
      formData.append("email", this.user.email);
      formData.append("phone", this.user.phone);
      formData.append("profileImage", this.user.profileImage);

      this.profileService.updateProfile(formData).subscribe(
        (response) => {

          this.user = response.updatedUser;
          this.generateQrCode();
          console.log(this.user);
          this.message = 'success';
          window.location.reload()
          
        },
        (error) => {
          console.error(error);
          this.message = 'failed';
        }
      );
    }

  }
  // open() {
  //   alert('chbik ya khra')
  //   const data = {};
  //   this.dialogService.openConfirmDialog(data);
  // }
  // open(){
  //   this.dialogService.openConfirmDialog();
  // }
  cancelUpdate() {
    //to refresh the page
    window.location.reload()
  }

  openPopup(event: Event) {
    event.preventDefault();
    let popup = document.getElementById("popup");
    if (popup) {
      popup.classList.add("open-popup");
    }
  }

  closePopup() {
    let popup = document.getElementById("popup");
    if (popup) {
      popup.classList.remove("open-popup");
    }
  }
}
