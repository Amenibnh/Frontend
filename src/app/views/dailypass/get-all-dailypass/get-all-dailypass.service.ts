import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAllDailypassService {

  constructor(private http: HttpClient) { }
  private apiURL = 'http://localhost:3001';
  
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

  getResponsableAssociationDetails(id:any): Observable<any> {
    const url = `${this.apiURL}/getResponsableAssociationDetails/${id}`;
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

  deletePatientPass(associationId: string, email: string) {
    const url = `${this.apiURL}/deletePatientPass/${associationId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    // Envoyer les deux paramètres dans le corps de la requête DELETE
    return this.http.delete<any>(url, { headers, body: { email } });
  }
  
  
  


  addPatientPass(associationId: any, email: string): Observable<any> {
    const url = `${this.apiURL}/addPatientPass/${associationId}`; 
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    // Pass both associationId and email in the request body
    return this.http.post<any>(url, { email }, { headers });
  }
  
  

  
  getPatientDailyPass(id:any): Observable<any> {
    const url = `${this.apiURL}/getPatientDailyPass/${id}`;
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