import { Component } from '@angular/core';
import {UpdateRepaService} from './update-repa.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({

  selector: 'app-update-repa',
  templateUrl: './update-repa.component.html',
  styleUrls: ['./update-repa.component.scss']
})
export class UpdateRepaComponent {
  repa: any;
  message: string = ''; 
  errMessage: string = "";
  constructor(private route: ActivatedRoute, private updatepassService: UpdateRepaService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const repaId = params.get('repaId');
      if (repaId) {
        this.updatepassService.getRepaId(repaId).subscribe(
          (response) => {
            this.repa = response.repa;
            console.log(this.repa);
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
    this.repa.profileImage = file;
  }
  updateRepa(event: any, id: any) {
   
    event.preventDefault();
    if (!this.repa.nomRepa) {
      this.errMessage = "Please add your nomRepa.";
      return; // Stop execution if any required field is empty
    }else if(!this.repa.price){
      this.errMessage = "Please add your price.";
      return;
    }else if (!this.repa.description) {
      this.errMessage = "Please add your description.";
      return; // Stop execution if any required field is empty
    }else{
      const formData = new FormData()
      formData.append("nomRepa", this.repa.nomRepa);
      formData.append("description", this.repa.description);
      formData.append("price", this.repa.price);
      formData.append("calories", this.repa.calories);
      formData.append("profileImage", this.repa.profileImage);

    
    this.updatepassService.updateRepa(id, formData).subscribe(
      (response) => {
        this.repa = response.updatedrepa;
        console.log(this.repa);
        this.message = 'success'; 
        // Rediriger vers la page des utilisateurs après une mise à jour réussie
        this.router.navigate(['/repas/repa']);
      },
      (error) => {
        console.error(error);
        this.message = 'failed';
      }
    );
  }

}
}