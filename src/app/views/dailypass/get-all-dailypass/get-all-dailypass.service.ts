import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAllDailypassService {

  constructor(private http: HttpClient) { }
  private apiURL = 'http://localhost:3001';
  
  getAllDailypass(): Observable<any> {
    const url = `${this.apiURL}/getAllDailyPass`;
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

  deleteDailyPass(id:any): Observable<any> {
    const url = `${this.apiURL}/deleteDailyPass/${id}`;
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