import { Component, OnInit } from '@angular/core';
import{ResultatService}from'./resultat.service';
@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.css']
})
export class ResultatComponent implements OnInit{
  
  constructor(private resultatService: ResultatService) { }



  
  ngOnInit(): void { }
}
