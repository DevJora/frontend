import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserDTO} from '../DTOs/userDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient, private router: Router) { }

  getUserInfo(id : number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/user/${id}`);
  }
}
