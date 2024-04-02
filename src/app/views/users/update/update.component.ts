import { Component } from '@angular/core';
import { UpdateService } from './update.service'
import { ActivatedRoute, Router } from '@angular/router';
@Component({

  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class UpdateComponent {
  user: any = {};
  message: string = '';
  errMessage: string = "";


  constructor(private route: ActivatedRoute, private updateService: UpdateService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('userId');
      if (userId) {
        this.updateService.getUserId(userId).subscribe(
          (response) => {
            this.user = response.user;
            console.log(this.user);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });


  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.user.profileImage = file;
  }

  updateUser(event: any, id: any) {
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
      // const data = {
      //   firstname: event.target.firstname.value,
      //   email: event.target.email.value,
      //   phone: event.target.phone.value,
      //   profileImage: event.target.profileImage.files[0], 
      //       }

      const formData = new FormData()
      formData.append("firstname", this.user.firstname);
      formData.append("email", this.user.email);
      formData.append("phone", this.user.phone);
      formData.append("profileImage", this.user.profileImage);
      // formData.append("firstname", event.target.firstname.value);
      //   formData.append("email", event.target.email.value);
      //   formData.append("phone", event.target.phone.value);
      //   // Assuming you have an input with the name 'profileImage'
      //   if (event.target.profileImage.files[0]) {
      //     formData.append("profileImage", event.target.profileImage.files[0],event.target.profileImage.files[0].name);
      //   }

      this.updateService.updateUser(id, formData).subscribe(
        (response) => {
          this.user = response.updatedUser;
          console.log(this.user);
          this.message = 'success';
          // Rediriger vers la page des utilisateurs après une mise à jour réussie
          this.router.navigate(['/users/user']);
        },
        (error) => {
          console.error(error);
          this.message = 'failed';
        }
      );
    }

  }
}