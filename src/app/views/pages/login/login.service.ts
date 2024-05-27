import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  

  constructor(private http: HttpClient) { }
  private apiURL = 'http://localhost:3001';

  login(email: string, password: string, subdomain:) {
      const url = `${this.apiURL}/login`;
      const body = { email, password };
      return this.http.post<any>(url, body);
  }
}