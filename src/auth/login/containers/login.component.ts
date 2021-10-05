import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'login-component',
  template: ` <auth-form (submitted)="loginUser($event)">
    <h1>Login</h1>
    <a routerLink="/auth/register">Noch kein Account??</a>
    <button type="submit">Login</button>
  </auth-form>`,
})
export class LoginComponent {
  loginUser(event: FormGroup) {
    console.log(event.value);
  }
}
