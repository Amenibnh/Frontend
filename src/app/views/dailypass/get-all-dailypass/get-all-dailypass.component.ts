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
  patientsWithPass: any[] = [];
  constructor(private route: ActivatedRoute, private dailypassService: GetAllDailypassService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.dailypassService.currentResponsable().subscribe(
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
  
              // Get daily passes for each patient
              allPatients.forEach((patient: any) => {
                this.dailypassService.getPatientDailyPass(patient._id).subscribe(
                  (dailyPasses) => {
                    // Check if the patient has daily passes
                    if (dailyPasses.dailypass.length === 0) {
                      // If the patient has no daily passes, add them to the list of patients without passes
                      this.patientsWithoutPass.push(patient);
                    }
                  },
                  (error) => {
                    console.error('Erreur lors de la récupération des laissez-passer quotidiens du patient :', error);
                  }
                );
              });
              console.log('Liste des patients sans dailypass:', this.patientsWithoutPass);
          
              this.dailypassService.getAllAssociationDailyPass2(this.dailypass._id).subscribe(
                (response) => {
                  this.patientsWithPass = response.dailypass; 
                  console.log('Liste des patients avec dailypass:', this.patientsWithPass);
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
        window.location.reload();

        console.log('Laissez-passer quotidien ajouté avec succès.');
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du laissez-passer quotidien :', error);
      }
    );
  }
  


  // Supprimer le laissez-passer du patient
  deletePatientPass(patientId: string, email: string) {
    // Récupérer l'ID de l'association à partir des détails de l'association
    const associationId = this.dailypass._id;
  
    // Appeler la méthode de service pour supprimer le laissez-passer du patient
    this.dailypassService.deletePatientPass(associationId, email).subscribe(
      () => {
        // Recharger la page après avoir supprimé le laissez-passer du patient
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  

  
}
