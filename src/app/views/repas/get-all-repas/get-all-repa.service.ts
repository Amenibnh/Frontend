import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAllRepaService {

  constructor(private http: HttpClient) { }
  private apiURL = 'http://localhost:3001';
  getAllRepas(): Observable<any> {
    const url = `${this.apiURL}/getAllRepas`;
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
  deleteRepas(id:any): Observable<any> {
    const url = `${this.apiURL}/deleteRepas/${id}`;
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
}