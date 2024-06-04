import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateService } from '../../admin-global/update/update.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  association: any = {};
  message: string = '';
  errMessage: string = "";
  constructor(private route:ActivatedRoute,private updateService:UpdateService,private router:Router){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const associationId = params.get('associationId');
      if (associationId) {
        this.updateService.getAssociationId(associationId).subscribe(
          (response) => {
            this.association = response;
            console.log(this.association);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });


  }
  




  updateAssociation(event: any, id: any) {
    // reg expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    event.preventDefault();
    if (!this.association.name) {
      this.errMessage = "Please add your name.";
      return;
    } else if (!this.association.description) {
      this.errMessage = "Please add a description.";
      return;
    } else if (!this.association.responsable || !emailRegex.test(this.association.responsable)) {
      this.errMessage = "Please enter a valid email address for the responsible.";
      return;
    } else if (!this.association.admin || !emailRegex.test(this.association.admin)) {
      this.errMessage = "Please enter a valid email address for the admin.";
      return;
    } else if (!this.association.ville) {
      this.errMessage = "Please add your ville.";
      return;
    } else if (!this.association.region) {
      this.errMessage = "Please add your region.";
      return;
    } else if (!this.association.zip_code) {
      this.errMessage = "Please add your zip code.";
      return;
    } else {
      // If all fields are filled, proceed with form submission
      const formData = {
        name: this.association.name,
        description: this.association.description,
        responsable: this.association.responsable,
        admin: this.association.admin,
        ville: this.association.ville,
        region: this.association.region,
        zip_code: this.association.zip_code
      };
  
      this.updateService.updateAssociation(id, formData).subscribe(
        (response) => {
          this.association = response.updatedAssociation;
          console.log(this.association);
          this.message = 'success';
          // Redirect to the associations page after successful update
          this.router.navigate(['/AdminGlobal/adminGlobal']);
        },
        (error) => {
          console.error(error);
          this.message = 'failed';
        }
      );
    }
  }
  
  
  


    
}
