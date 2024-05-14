import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  constructor(private http: HttpClient) { }
  private apiURL = 'http://localhost:3001';
  
  getPatientById(id: any): Observable<any> {
    const url = `${this.apiURL}/getPatientById/${id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(url, { headers });
  }

  updatePatient(id: any, data: any): Observable<any> {
    const url = `${this.apiURL}/updatepatient/${id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(url, data, { headers });
  }
}
