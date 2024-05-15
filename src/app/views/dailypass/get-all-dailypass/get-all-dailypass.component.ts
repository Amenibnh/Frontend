import { Component, OnInit } from '@angular/core';
import { GetAllDailypassService } from './get-all-dailypass.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-get-all-dailypass',
  templateUrl: './get-all-dailypass.component.html',
  styleUrls: ['./get-all-dailypass.component.css']
})
export class GetAllDailypassComponent implements OnInit {
  dailypass: any;
  userId: string = "";
  patientsWithoutPass: any[] = [];

  constructor(private route: ActivatedRoute, private dailypassService: GetAllDailypassService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.dailypassService.currentAdmin().subscribe(
        (response) => {
          this.userId = response.user._id;
          console.log('ID de l\'utilisateur connecté :', this.userId);
          this.dailypassService.getResponsableAssociationDetails(this.userId).subscribe(
            (dailypass) => {
              this.dailypass = dailypass;
              console.log('Détails de l\'association :', this.dailypass);

              // Extract patients from association details
              const allPatients = this.dailypass.patients;
              console.log('Liste des patients :', allPatients);

              // Filter patients without daily pass
              this.patientsWithoutPass = allPatients.filter((patient: any) => !patient.dailyPass);
              console.log('Liste des patients sans dailypass:', this.patientsWithoutPass);
            },
            (error) => {
              console.error('Erreur lors de la récupération des détails de l\'association :', error);
            }
          );
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'ID de l\'utilisateur :', error);
        }
      );
    });
  }
  addDailyPass(associationId: string, email: string) {
    this.dailypassService.addPatientPass(associationId, email).subscribe(
      (response) => {
        console.log('Laissez-passer quotidien ajouté avec succès.');
        // Vous pouvez ajouter du code pour gérer la réponse ici si nécessaire
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du laissez-passer quotidien :', error);
      }
    );
  }
  


  // Supprimer le laissez-passer du patient
  deletePatientPass(associationId: string, email: string) {
    this.dailypassService.deletePatientPass(associationId, email).subscribe(
      () => {
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  

  
}
