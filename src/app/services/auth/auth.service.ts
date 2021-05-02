import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: any) {
    return this.http.post(`${this.apiServerUrl}/authenticate`, credentials).pipe(
      map((response: any) => {
        if (response && response.success && response.data.token) {
          // const decodedToken = helper.decodeToken(response.data.token);
          // decodedToken.token = response.data.token;
          return response.data.token;
        } else {
          return response;
        }
      })
    );
  }

}
