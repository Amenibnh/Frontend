import { Component, OnInit } from '@angular/core';
import {AddService} from './add.service'
import { Router } from '@angular/router';

@Component({

  selector: 'app-add',
    templateUrl:'./add.component.html',
    styleUrls: ['./add.component.css']
  })
export class AddComponent implements OnInit{
  repa: any ={};
  message: string = ''; 
  errMessage: string = "";
  constructor(private addService: AddService, private router:Router) { }

  ngOnInit(): void {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.repa.profileImage = file;
  }

  addRepa(event: any) {
    event.preventDefault();
    // console.log(this.repa)
    if (!this.repa.nomRepa) {
      this.errMessage = "Please add your nomRepa.";
    }else if (!this.repa.description) {
      this.errMessage = "Please add your description.";
    }else if(!this.repa.ingredients){
      this.errMessage = "Please add your ingredients.";
      return;
    }else if(!this.repa.price){
      this.errMessage = "Please add your price.";
    }else if (!this.repa.calories) {
      this.errMessage = "Please add your calories.";
    }else{
      const formData = new FormData();
      formData.append("nomRepa", this.repa.nomRepa);
      formData.append("description", this.repa.description);
      formData.append("price", this.repa.price);
      formData.append("calories", this.repa.calories);
      formData.append("profileImage", this.repa.profileImage);

    this.addService.addRepa(formData).subscribe(
      (response) => {
        // this.repa = response.repa;
        console.log(this.repa);
        // Rediriger vers la page des utilisateurs après une mise à jour réussie
        this.router.navigate(['/repas/repa']);
      },
      (error) => {
        
        console.error(error);
      }
    );
  }}

}