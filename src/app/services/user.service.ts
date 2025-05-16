import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {finalize, Observable} from 'rxjs';
import {UserDTO} from '../DTOs/userDTO';
import {LoadingService} from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient, private router: Router, private readonly loadingService: LoadingService) { }

  getUserInfo(id : number): Observable<UserDTO> {
    this.loadingService.show();
    return this.http.get<UserDTO>(`${this.apiUrl}/user/${id}`).pipe(finalize(() => this.loadingService.hide()));
  }

  checkUsernameExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/user/check-username?username=${username}`);
  }
}
