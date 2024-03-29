import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddService {
  constructor(private http: HttpClient) { }

  private apiURL = 'http://localhost:3001';
  
  addRepa(formData: FormData): Observable<any> {

    const url = `${this.apiURL}/addRepa`;
    const token=localStorage.getItem('token')

    // Define headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    
    });
    
    // Make HTTP request with headers
    return this.http.post<any>(url,formData,{ headers });
  }
}