import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileuserService {

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

   
  updateProfile( data: any): Observable<any> {
    const url = `${this.apiURL}/updateUser`;
    const token=localStorage.getItem('token')
    // Define headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,

    });
    for (let pair of data.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    console.log(url)
    // Make HTTP request with headers
    return this.http.put<any>(url,data, { headers });
  }
 
}