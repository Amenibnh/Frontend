import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
 
 constructor(private http: HttpClient) { }
  private apiURL = 'http://localhost:3001';

  register(firstname: string, lastname: string, email: string, address: string, country: string, password: string, repeatpassword: string,phone:string,gender:string,disabilityType:string) {
    const url = `${this.apiURL}/register`;
    const body = { firstname, lastname, email, address, country, password, repeatpassword ,phone,gender,disabilityType};
    return this.http.post<any>(url, body);
  }

  getAllSites():Observable<any>{
    const url = `${this.apiURL}/getallsite`;
    return this.http.get<any>(url);
  }
  
}