import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  canActivate(): boolean {
    if (this._authService.isLogin()) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

}
