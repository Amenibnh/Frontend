import { Component, Injectable, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class DashboardComponent implements OnInit {
  associationDetails: any;
  userId: string = "";
  patients: any[] = [];
  associationDailyPasses: any[] = [];
  newPass: number = 0;
  associationRepaDetails: any[] = [];
  totalPatients: number = 0; 
  pdf_btn: HTMLElement | null = null;
  searchEmail: string='';


  constructor(private route: ActivatedRoute, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.dashboardService.currentAdmin().subscribe(
        (response) => {
          this.userId = response.user._id;
          console.log('ID de l\'utilisateur connecté :', this.userId);
          this.dashboardService.getAdminAssociationDetails(this.userId).subscribe(
            (associationDetails) => {
              this.associationDetails = associationDetails;
              console.log('Détails de l\'association :', this.associationDetails);

              // Extract patients from association details
              this.patients = this.associationDetails.patients;
              console.log('Liste des patients :', this.patients);
              this.totalPatients = this.patients.length;
              console.log('Total des patients :',this.totalPatients)
              const associationId = this.associationDetails._id;

              // Load association daily passes
              this.loadAssociationDailyPasses(associationId);
              this.loadAssociationRepaDetails(associationId); 
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


    
    // Initialize buttons here
    this.pdf_btn = document.querySelector('#toPDF');
  

    // Check if pdf_btn is not null before assigning onclick handler
    if (this.pdf_btn) {
      this.pdf_btn.onclick = () => {
        this.toPDF();
      };
    }

  }

  loadAssociationRepaDetails(associationId: string) {
    this.dashboardService.getAssociationRepaDetails(associationId).subscribe(
      (response) => {
        this.associationRepaDetails = response.clients;
        console.log('Détails des repas de l\'association :', this.associationRepaDetails);
        
      },
      (error) => {
        console.error('Erreur lors de la récupération des repas de l\'association :', error);
      }
    );
  }


  updatePatientPass(patientId: string, newPass: number) {
    const passString = newPass.toString(); // Convertir le nombre en chaîne de caractères
    this.dashboardService.updatePatientDailyPass(patientId, passString).subscribe(
      (response) => {
        console.log('Pass mis à jour avec succès !', response);
        this.loadAssociationDailyPasses(this.associationDetails._id);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du pass quotidien :', error);
      }
    );
  }
  

  loadAssociationDailyPasses(associationId: string) {
    this.dashboardService.getAllAssociationDailyPass(associationId).subscribe(
      (response) => {
        this.associationDailyPasses = response.dailypass;
        console.log('Détails des passes quotidiens de l\'association :', this.associationDailyPasses);
      },
      (error) => {
        console.error('Erreur lors de la récupération des passes quotidiens de l\'association :', error);
      }
    );
  }

  deletepatient(id: any) {
    this.dashboardService.deletepatient(id).subscribe(
      () => {
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

// 3. Converting HTML table to PDF

toPDF() {
  const customers_table = document.querySelector('#repa_table');
  if (!customers_table) return; 

  const thead = customers_table.querySelector('thead');
  const tbody = customers_table.querySelector('tbody');

  if (!thead || !tbody) return;

  const html_code = 
  `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      table {
        border-collapse: collapse;
        width: 100%;
      }
      th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
    </style>
  </head>
  <body>
    <table>
      <thead>
        ${thead.innerHTML}
      </thead>
      <tbody>
        ${tbody.innerHTML}
      </tbody>
    </table>
  </body>
  </html>`;
  
  const new_window = window.open();
  if (!new_window) return; 
  new_window.document.write(html_code);

  setTimeout(() => {
    new_window.print();
    new_window.close();
  }, 400);
}


searchByEmail() {
  if (this.searchEmail === '') {
    // Si le champ de recherche est vide, réinitialiser la liste des patients à partir des détails de l'association
    this.dashboardService.getAdminAssociationDetails(this.userId).subscribe(
      (associationDetails) => {
        this.associationDetails = associationDetails;
        this.patients = this.associationDetails.patients;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de l\'association :', error);
      }
    );
  } else {
    // Filtrer les patients par pays en comparant la première lettre
    this.dashboardService.getAdminAssociationDetails(this.userId).subscribe(
      (associationDetails) => {
        this.associationDetails = associationDetails;
        this.patients = this.associationDetails.patients.filter((patient: any) =>
          patient.email.toLowerCase().startsWith(this.searchEmail.toLowerCase())
        );
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de l\'association :', error);
      }
    );
  }
}



}