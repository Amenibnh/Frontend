import { Component, Injectable, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class DashboardComponent implements OnInit {
  associationDetails:any;
  userId:string="";
  patients:any[]=[];

  constructor(private route: ActivatedRoute,private dashboardService: DashboardService) { }

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


  //supprimer
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
}