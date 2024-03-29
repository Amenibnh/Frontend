import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private http: HttpClient) { }
  private apiURL = 'http://localhost:3001';
  forgotpassword(email: string) {
    const url = `${this.apiURL}/getbill`;
    const body = { email };
    console.log(url)
    return this.http.post<any>(url, body);
}
}

