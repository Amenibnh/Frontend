import { Component, OnInit } from '@angular/core';
import { AdminGlobalService } from './admin-global.service';

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
  ngOnInit(): void {
    this.getAllAssociations();
    this.startCounter();
  }
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


  getAllAssociations() {
    this.adminGlobalService.getAllAssociation().subscribe(
      (response: any) => {
        this.associations = response;
        this.calculatePatientRatioByCountry();
      },
      (error) => {
        console.error(error);
      }
    );
  }
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
