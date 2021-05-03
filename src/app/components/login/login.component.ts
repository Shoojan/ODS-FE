import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  public formGroup: FormGroup;

  public isLogin = false;
  public welcomeUsername = "";

  private tokenRequestTerm = "jwtToken";

  public decodedToken: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

    if (this.authService.isLogin()) {
      this.isLogin = true;
      this.welcomeUsername = this.authService.getFullName();
    }

    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })

  }

  ngOnInit(): void {
  }

  loginUserCheck() {
    // const email = this.formGroup.get("email");
    // const password = this.formGroup.get("password");
    this.authService.postRequest('/authenticate', this.formGroup.value).subscribe((data: any) => {
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
