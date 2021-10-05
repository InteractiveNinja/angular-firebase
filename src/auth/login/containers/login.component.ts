import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-component',
  template: ` <auth-form (submitted)="loginUser($event)">
    <h1>Login</h1>
    <a routerLink="/auth/register">Noch kein Account??</a>
    <button type="submit">Login</button>
    <p class="error" *ngIf="error">{{ error }}</p>
  </auth-form>`,
})
export class LoginComponent {
  error: string | undefined;

  constructor(private service: AuthService, private router: Router) {}

  loginUser(event: FormGroup) {
    const { password, email } = event.value;
    this.service.loginUser(email, password).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (err) => {
        this.error = err;
      }
    );
  }
}
