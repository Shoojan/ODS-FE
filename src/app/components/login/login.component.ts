import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

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
  returnUrl = '';

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }


  login() {

    // this.authService.login()
    //   .pipe(finalize(() => {
    //     this.loading = false;
    //   }))
    //   .subscribe((response: any) => {
    //     if (response && response.success && response.data.message) {
    //       alert(response.data.message);
    //     } else {
    //       response.fullName = `${response.firstName} ${response.lastName}`;
    //       // this.router.navigateByUrl(this.returnUrl);
    //     }
    //   });

  }
}
