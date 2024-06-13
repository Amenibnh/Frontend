import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddService } from './add.service'; // Assurez-vous d'ajuster le chemin selon votre structure

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  patient: any = {}; // Déclaration de l'objet patient
  errMessage: string = ""; // Message d'erreur

  constructor(private addService: AddService, private router: Router) {}

  // Méthode appelée lors de la soumission du formulaire
  addPatient(event: any) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    // Validation des données du formulaire
    if (!this.isValidPatientData()) {
      this.errMessage = "Veuillez remplir tous les champs.";
      return;
    }

    // Appel du service pour ajouter un patient
    this.addService.addpatient(this.patient).subscribe(
      (response) => { // Réponse réussie
        console.log(response); // Affiche la réponse dans la console
        this.router.navigate(['/dashboard']);
      },
      (error) => { // En cas d'erreur
        console.error(error); // Affiche l'erreur dans la console

        // Gestion des messages d'erreur
        if (error.error && error.error.message) {
          this.errMessage = error.error.message;
        } else {
          this.errMessage = "Une erreur s'est produite lors de l'ajout du patient.";
        }
      }
    );
  }

  // Méthode pour valider les données du patient
  isValidPatientData(): boolean {
    return !!(
      this.patient.firstname &&
      this.patient.lastname &&
      this.patient.password &&
      this.patient.repeatpassword &&
      this.patient.email &&
      this.patient.address &&
      this.patient.ville &&
      this.patient.phone &&
      this.patient.gender &&
      this.patient.disabilityType
    );
  }
}
