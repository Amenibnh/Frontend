import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddService } from '../../admin-global/add/add.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  association: any = {};
  errMessage: string = "";

  constructor(private addService: AddService, private router: Router) {}

  addAssociation(event: any) {
    event.preventDefault();

    if (!this.isValidAssociationData()) {
      this.errMessage = "Veuillez remplir tous les champs.";
      return;
    }

    this.addService.addAssociation(this.association).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/AdminGlobal/adminGlobal']);
      },
      (error) => {
        console.error(error);
        if (error.error && error.error.message) {
          this.errMessage = error.error.message;
        } else {
          this.errMessage = "Une erreur s'est produite lors de l'ajout de l'association.";
        }
      }
    );
  }

  isValidAssociationData(): boolean {
    return !!(
      this.association.name &&
      this.association.description &&
      this.association.responsable &&
      this.association.admin &&
      this.association.ville &&
      this.association.region &&
      this.association.zip_code
    );
  }
}
