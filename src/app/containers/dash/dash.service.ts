import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DashService {

  constructor(private http: HttpClient) { }
  private apiURL = 'http://localhost:3001';


  getLoggedInUser(): Observable<any> {
    const url = `${this.apiURL}/getUserId`;
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


  logoutUser(): Observable<any> {
    const url = `${this.apiURL}/logout`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // Notez l'utilisation de l'objet d'option pour spécifier les en-têtes
    return this.http.post<any>(url, {}, { headers });
  }
}
