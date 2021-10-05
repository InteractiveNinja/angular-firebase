import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/service/auth.service';
import firebase from 'firebase/compat';
import FirebaseError = firebase.FirebaseError;
import { Router } from '@angular/router';

@Component({
  selector: 'register-component',
  template: `<auth-form (submitted)="registerUser($event)">
    <h1>Register</h1>
    <a routerLink="/auth/login">Hast du bereits ein Account?</a>
    <button type="submit">Register</button>
    <p class="error" *ngIf="error">{{ error }}</p>
  </auth-form>`,
})
export class RegisterComponent {
  constructor(private service: AuthService, private router: Router) {}

  error: string | undefined;

  registerUser(event: FormGroup) {
    const { password, email } = event.value;
    this.service.createUser(email, password).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (err) => {
        this.error = err;
      }
    );
  }
}
