import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Optima1Request, Optima1Response} from './models/Optima1';



@Injectable({
  providedIn: 'root'
})
export class OptimaService {
  private apiUrl = 'http://localhost:8082/api/optima/';

  constructor(private http: HttpClient) {}

  calculateOptimum(request: Optima1Request): Observable<Optima1Response> {
    return this.http.post<Optima1Response>(`${this.apiUrl}1`, request);
  }

  calculateOptimum2(payload: any): Observable<any> {
    console.log(payload)
    return this.http.post(`${this.apiUrl}2`, payload);
  }
  calculateOptimum3(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}3`, payload);
  }
  calculateOptimum4(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}4`, payload, { headers });
  }

  calculateOptimum5(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}5`, payload);
  }
  calculateOptimum6(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}6`, payload);
  }
  calculateOptimum7(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}7`, payload);
  }
  calculateOptimum8(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}8`, payload);
  }
  calculateOptimum9(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}9`, payload);
  }
  calculateOptimumX(payload: any): Observable<any> {
    console.log('test')
    return this.http.post(`${this.apiUrl}X`, payload);
  }




}
