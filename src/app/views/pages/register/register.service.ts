import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
 
 constructor(private http: HttpClient) { }
  private apiURL = 'http://localhost:3001';

  register(firstname: string, lastname: string, email: string, address: string, ville: string, password: string, repeatpassword: string,phone:string,gender:string,disabilityType:string,role:string,secretKey:string) {
    const url = `${this.apiURL}/register`;
    let body:any = { firstname, lastname, email, address, ville, password, repeatpassword ,phone,gender,role,secretKey};
    if(role === 'user'){
      body={...body, disabilityType};
    }
    return this.http.post<any>(url, body);
  }

  getAllSites():Observable<any>{
    const url = `${this.apiURL}/getallsite`;
    return this.http.get<any>(url);
  }
  
}