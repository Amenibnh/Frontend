import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private http: HttpClient) { }
  private apiURL = 'http://localhost:3001';

  updateAssociation(id: any, data: any): Observable<any> {
    const url = `${this.apiURL}/updateAssociation/${id}`;
    const token = localStorage.getItem('token');
    // Define headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    console.log(url);
    console.log(data); // Check the data being sent
    
    // Make HTTP request with headers
    return this.http.put<any>(url, data, { headers });
  }

  getAssociationId(id: any): Observable<any> {
    const url = `${this.apiURL}/getAssociationId/${id}`;
    const token = localStorage.getItem('token');
    // Define headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // Make HTTP request with headers
    return this.http.get<any>(url, { headers });
  }
}
