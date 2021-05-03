import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentYear = new Date().getFullYear();
  submitted = false;
  loading = false;
  errorMessage = '';
  returnUrl = '/orders';

  public email = "a@gmail.com";
  public password = "a123";

  public isLogin = false;
  public welcomeUsername = "";

  private tokenRequestTerm = "jwtToken";

  public decodedToken: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

    if (this.authService.isLogin()) {
      this.isLogin = true;
      this.welcomeUsername = this.authService.getFullName();
    }

  }

  ngOnInit(): void {
  }

  loginUserCheck() {
    if (this.email == "") {
      alert("Email should not be empty");
      return;
    }
    if (this.password == "") {
      alert("Password should not be empty");
      return;
    }
    let request = {
      "email": this.email,
      "password": this.password
    }
    this.authService.postRequest('/authenticate', request).subscribe((data: any) => {
      if (data.hasOwnProperty(this.tokenRequestTerm)) {
        this.authService.setLoginToken(data[this.tokenRequestTerm]);
        this.authService.setLoginData(data);
        this.welcomeUsername = this.authService.getFullName();
        this.isLogin = true;
        this.router.navigateByUrl(this.returnUrl);
      }
    }, error => {
      alert("Eror in login " + error);
    })
  }

  logout() {
    this.isLogin = false;
    this.authService.logoutUser();
  }
}
