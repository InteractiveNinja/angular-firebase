import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'register-component',
  template: `<auth-form (submitted)="registerUser($event)">
    <h1>Register</h1>
    <a routerLink="/auth/login">Hast du bereits ein Account?</a>
    <button type="submit">Register</button></auth-form
  >`,
})
export class RegisterComponent {
  registerUser(event: FormGroup) {
    console.log(event.value);
  }
}
