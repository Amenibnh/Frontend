import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResultatService {

  constructor(private http: HttpClient) { }
  private apiURL = 'http://localhost:3001';

}
