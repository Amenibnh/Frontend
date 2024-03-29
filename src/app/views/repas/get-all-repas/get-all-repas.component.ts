import { Component, OnInit } from '@angular/core';
import { GetAllRepaService } from './get-all-repa.service'
import { Router } from '@angular/router';

@Component({

  selector: 'app-get-all-repas',
    templateUrl:'./get-all-repas.component.html',
    styleUrls: ['./get-all-repas.component.scss']
  })
export class GetAllRepasComponent implements OnInit {
  repas: any;
  
  constructor(private repaService: GetAllRepaService, private router:Router) { }

  ngOnInit(): void {
    this.getAllRepas();
  }

  getAllRepas() {
    this.repaService.getAllRepas().subscribe(
      (response) => {
        this.repas = response.repas;
        console.log(this.repas);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  deleteRepas(id:any) {
    this.repaService.deleteRepas(id).subscribe(
      (response) => {
        
        this.repas = response.repas;
        console.log(this.repas);
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}