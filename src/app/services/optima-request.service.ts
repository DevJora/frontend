import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {Optima1Request, Optima1Response} from '../models/Optima1';
import {LoadingService} from './loading.service';
import {LogDTO} from '../DTOs/logDTO';



@Injectable({
  providedIn: 'root'
})
export class OptimaService {
  private apiUrl = 'https://backend-opti-ye2p.onrender.com/optima/';

  constructor(private http: HttpClient, private loadingService: LoadingService) {}

  calculateOptimum(request: Optima1Request): Observable<Optima1Response> {
    this.loadingService.show();
    return this.http.post<Optima1Response>(`${this.apiUrl}1`, request).pipe(finalize(() => this.loadingService.hide()));
  }

  calculateOptimum2(payload: any): Observable<any> {
    this.loadingService.show();
    return this.http.post(`${this.apiUrl}2`, payload).pipe(finalize(() => this.loadingService.hide()));
  }
  calculateOptimum3(payload: any): Observable<any> {
    this.loadingService.show();
    return this.http.post(`${this.apiUrl}3`, payload).pipe(finalize(() => this.loadingService.hide()));
  }
  calculateOptimum4(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.loadingService.show();

    return this.http.post(`${this.apiUrl}4`, payload, { headers }).pipe(finalize(() => this.loadingService.hide()));
  }

  calculateOptimum5(payload: any): Observable<any> {
    this.loadingService.show();
    return this.http.post(`${this.apiUrl}5`, payload).pipe(finalize(() => this.loadingService.hide()));
  }
  calculateOptimum6(payload: any): Observable<any> {
    this.loadingService.show();
    return this.http.post(`${this.apiUrl}6`, payload).pipe(finalize(() => this.loadingService.hide()));
  }
  calculateOptimum7(payload: any): Observable<any> {
    this.loadingService.show();
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

  verifyOptimaPermission( algo: string, algos: string[]){
    if(algos.includes(algo)) return true;
    else return false;
  }

  verifyOptimaPermissionForFreemium(logs: LogDTO[], algo: string): boolean{
    for(let log of logs ){
      if(log.description == algo) return true;
    }
    return false;
  }




}
