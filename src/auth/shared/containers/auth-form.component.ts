import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'auth-form',
  styleUrls: ['./auth-form.component.scss'],
  template: ` <div class="auth-form">
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <ng-content select="h1"></ng-content>
      <div>
        <label>
          <input formControlName="email" type="text" placeholder="Email" />
        </label>
        <label>
          <input
            formControlName="password"
            type="password"
            placeholder="Passwort"
          />
        </label>

        <div *ngIf="PasswordInvalid" class="error">
          Passwort ist nicht gültig
        </div>
        <div *ngIf="EmailInvalide" class="error">Email ist nicht gültig</div>
      </div>
      <ng-content select=".error"></ng-content>
      <div class="auth-form__action">
        <ng-content select="button"></ng-content>
      </div>
      <div class="auth-form__toggle">
        <ng-content select="a"></ng-content>
      </div>
    </form>
  </div>`,
})
export class AuthFormComponent {
  form = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required],
  });

  @Output()
  submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form);
    }
  }

  get PasswordInvalid() {
    const control = this.form.get('password');
    return control?.hasError('required') && control?.touched;
  }
  get EmailInvalide() {
    const control = this.form.get('email');
    return control?.hasError('email') && control?.touched;
  }
}
