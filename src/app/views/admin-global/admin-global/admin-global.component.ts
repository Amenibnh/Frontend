import { Component, OnInit } from '@angular/core';
import { AdminGlobalService } from './admin-global.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-admin-global',
  templateUrl: './admin-global.component.html',
  styleUrls: ['./admin-global.component.css']
})
export class AdminGlobalComponent implements OnInit {
  constructor(private adminGlobalService: AdminGlobalService) { }

  associations: any;
  patientRatioByCountry: any;
  counter:number=0;
  totalRatio:number=0;
  intervalId:any;

  totalAdmins:number=0;
  totalPatients:number=0;
  totalResponsables:number=0;

  totalMale:number=0;
  totalFemale:number=0;
  
  ngOnInit(): void {
    this.getAllAssociations();
    this.startCounter();
    this.calculateTotalCounts();
  }

//
  startCounter() {

    // Interval to update counter every 30ms
    this.intervalId = setInterval(() => {
        if (this.counter === this.totalRatio) {
            clearInterval(this.intervalId);
        } else {
            this.counter += 1;
        }
    }, 30);
}

//obtenir le nbr totale de chaque genre dans tous les association
countGender() {
  let totalMale = 0;
  let totalFemale = 0;

  this.associations.forEach((association: any) => {
    if (association.patients) {
      association.patients.forEach((patient: any) => {
        if (patient.gender === 'Male') {
          totalMale++;
        } else if (patient.gender === 'Female') {
          totalFemale++;
        }
      });
    }
  });

  console.log("Total Male:", totalMale);
  console.log("Total Female:", totalFemale);

  this.totalMale = totalMale;
  this.totalFemale = totalFemale;

  this.generateGenderChart();
}

generateGenderChart() {
  const chartElement = document.getElementById('genderChart') as HTMLCanvasElement;
  if (chartElement) {
    const ctx = chartElement.getContext('2d');
    if (ctx) {
      const genderChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Male', 'Female'],
          datasets: [{
            data: [this.totalMale, this.totalFemale],
            backgroundColor: [
              'rgba(54, 162, 235, 0.6)', // Couleur pour les hommes
              'rgba(255, 99, 132, 0.6)' // Couleur pour les femmes
            ]
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Gender Distribution',
              color:'black'
            }
          }
        }
      });
      genderChart.options.plugins!.legend={
        labels:{
          color:'black'
        }
      }
    } else {
      console.error("Could not get 2d context for chart canvas.");
    }
  } else {
    console.error("Could not find chart canvas element.");
  }
}

//afficher la repartition des patients par country
generateCountryChart() {
  const chartElement = document.getElementById('countryChart') as HTMLCanvasElement;
  if (chartElement) {
    const ctx = chartElement.getContext('2d');
    if (ctx) {
      const labels = Object.keys(this.patientRatioByCountry);
      const data = Object.values(this.patientRatioByCountry);
      const backgroundColor = this.generateRandomColors(labels.length); // Générer des couleurs aléatoires
      
      const countryChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: backgroundColor
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Répartition des patients par pays',
              color: 'black'
            }
          }
        }
      });
      countryChart.options.plugins!.legend = {
        labels: {
          color: 'black'
        }
      };
    } else {
      console.error("Impossible d'obtenir le contexte 2D pour le canevas du graphique.");
    }
  } else {
    console.error("Impossible de trouver l'élément du canevas du graphique.");
  }
}

// Fonction pour générer des couleurs aléatoires
generateRandomColors(count: number): string[] {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
    colors.push(color);
  }
  return colors;
}








//  compter les admins, les responsables et les patients
calculateTotalCounts() {
  let totalAdmins = 0;
  let totalResponsables = 0;
  let totalPatients = 0;

  this.associations.forEach((association: any) => {
    if (association.admin) {
      totalAdmins++;
    }
    if (association.responsable) {
      totalResponsables++;
    }
    if (association.patients) {
      totalPatients += association.patients.length;
    }
  });
  this.totalAdmins=totalAdmins;
  this.totalPatients=totalPatients;
  this.totalResponsables=totalResponsables;

  console.log("Total Admins:", totalAdmins);
  console.log("Total Responsables:", totalResponsables);
  console.log("Total Patients:", totalPatients);
}

  

//lister les patients en defeculte par ville 
calculatePatientRatioByCountry() {
  // Getting all patients
  const allPatients = this.associations.reduce((accumulator: any[], association: any) => {
    return accumulator.concat(association.patients);
  }, []);

  // Calculating patient count by country
  const patientCountByCountry = allPatients.reduce((accumulator: any, patient: any) => {
    const country = patient.country; 
    accumulator[country] = (accumulator[country] || 0) + 1;
    return accumulator;
  }, {});

  // Calculating ratio
  const totalPatients = allPatients.length;
  this.patientRatioByCountry = Object.keys(patientCountByCountry).reduce((ratioObject: any, country: string) => {
    ratioObject[country] = Math.floor(patientCountByCountry[country] / totalPatients * 100);
    return ratioObject;
  }, {});

  console.log(this.patientRatioByCountry);
   // Calculating total ratio
   let totalRatio = 0;
   for (const country in this.patientRatioByCountry) {
       if (this.patientRatioByCountry.hasOwnProperty(country)) {
           totalRatio += this.patientRatioByCountry[country];
       }
   }

   console.log('Total ratio:', Math.floor(totalRatio));
   this.totalRatio = Math.floor(totalRatio);
}

//avoir tous les association
  getAllAssociations() {
    this.adminGlobalService.getAllAssociation().subscribe(
      (response: any) => {
        this.associations = response;
        this.calculatePatientRatioByCountry();
        this.calculateTotalCounts();
        this.countGender();
        this.generateCountryChart();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  //supprimer
  deleteAssociation(id: any) {
    this.adminGlobalService.deleteAssociation(id).subscribe(
      () => {
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
