import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  private apiURL = 'http://localhost:3001';


  getAssociationRepaDetails(associationId: string): Observable<any> {
    const url = `${this.apiURL}/getAssociationRepaDetails/${associationId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(url, { headers });
  }
  

  currentAdmin(): Observable<any> {
    const url = `${this.apiURL}/currentAdmin`;
    const token=localStorage.getItem('token')
    // Define headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
      // Add more headers if needed
    });

    // Make HTTP request with headers
    return this.http.get<any>(url, { headers });
  }


  getAdminAssociationDetails(id:any): Observable<any> {
    const url = `${this.apiURL}/getAdminAssociationDetails/${id}`;
    const token=localStorage.getItem('token')
    // Define headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
      // Add more headers if needed
    });

    // Make HTTP request with headers
    return this.http.get<any>(url, { headers });
  }


  updatePatientDailyPass(patientId: string, pass: string): Observable<any> {
    const url = `${this.apiURL}/updatePatientDailyPass/${patientId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const body = { pass };
    return this.http.put<any>(url, body, { headers });
  }
  

  deletepatient(id:any): Observable<any> {
    const url = `${this.apiURL}/deletepatient/${id}`;
    const token=localStorage.getItem('token')
    // Define headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
      // Add more headers if needed
    });

    // Make HTTP request with headers
    return this.http.delete<any>(url, { headers });
  }
  
  getAllAssociationDailyPass(associationId: string): Observable<any> {
    const url = `${this.apiURL}/getAllAssociationDailyPass/${associationId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(url, { headers });
  }


 
}
