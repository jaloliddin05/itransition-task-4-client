import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get(API_URL.USER_URL, { withCredentials: true });
  }

  deleteOne(id: string) {
    return this.httpClient.delete(`${API_URL.USER_URL}/${id}`, {
      withCredentials: true,
    });
  }

  deleteMore(ids: string[]) {
    return this.httpClient.delete(API_URL.USER_URL, {
      body: { ids },
      withCredentials: true,
    });
  }

  changeStatus(ids: string[], status: boolean) {
    return this.httpClient.patch(
      `${API_URL.USER_URL}/status`,
      { ids, status },
      { withCredentials: true }
    );
  }
}
