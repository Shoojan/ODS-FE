import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  getLoginToken() {
    const token = localStorage.getItem("token");
    return token ? token : "";
  }

  setLoginToken(token: string) {
    if (token != "")
      localStorage.setItem("token", token)
  }

  setLoginData(data: any) {
    let profileDetail = data ? JSON.stringify(data.profileDetail) : '';
    localStorage.setItem("login_data", profileDetail);
  }

  getFullName() {
    return this.getLoginDataByKey("firstName") + " " + this.getLoginDataByKey("lastName");
  }

  getLoginDataByKey(key: string) {
    let loginData = localStorage.getItem("login_data");
    if (loginData) {
      let data = JSON.parse(loginData);
      if (data.hasOwnProperty(key))
        return data[key];
    }
    return null;
  }

  public postRequest(url: string, param: {}): Observable<any> {
    return this.http.post(this.apiServerUrl + url, param, httpOptions)
      .pipe(
        catchError(this.handleError.bind(this)) // then handle the error
      );
  }

  public getAllData(url: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}${url}`);
  }

  public deleteData(url: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}${url}`);
  }

  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return error;
    } else {
      return throwError("Something went wrong while connecting with server");
    }
  }


  isLogin() {
    try {
      console.log("login token ", this.getLoginToken());
      return !!this.getLoginToken();
    } catch (e) {
    }
    return false;
  }

  public logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }

}
