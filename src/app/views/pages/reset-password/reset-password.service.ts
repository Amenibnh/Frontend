import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }

  resetPassword(token: string, newPassword: string): Observable<any> {
    const url = 'http://localhost:3001/resetPassword'; 
    const body = { token, newPassword };
    return this.http.post<any>(url, body);
  }
}
