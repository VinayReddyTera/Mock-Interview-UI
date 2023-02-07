import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  
  login(data:any): Observable<any> {
    return this.http.post("http://localhost:1050/login",data);
  }

  register(data:any): Observable<any> {
    return this.http.post("http://localhost:1050/register",data);
  }

  forgotPassword(data:any): Observable<any> {
    return this.http.post("http://localhost:1050/forgotPassword",data);
  }

}
