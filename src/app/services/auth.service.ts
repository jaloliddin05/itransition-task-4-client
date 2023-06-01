import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constantas';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  userRegister(data: any) {
    return this.httpClient.post(API_URL.USER_URL, data);
  }

  userLogin(data: any) {
    return this.httpClient.post(API_URL.LOGIN_URL, data);
  }
}
