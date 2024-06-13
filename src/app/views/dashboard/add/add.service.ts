import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddService {

  constructor(private http: HttpClient) { }

  private apiURL = 'http://localhost:3001';

  addpatient(patientData: any): Observable<any> {
    const url = `${this.apiURL}/addpatient`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(url, patientData, { headers });
  }
}
