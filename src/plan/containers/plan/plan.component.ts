import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'plan',
  styleUrls: ['./plan.component.scss'],
  template: ` <div class="auth-form">
    <h1>Neuen Plan erstellen</h1>
    <form [formGroup]="form" (ngSubmit)="onSend()">
      <label>
        <input
          type="text"
          name=""
          placeholder="Titel"
          formControlName="title"
          id=""
        />
      </label>
      <label>
        <input
          type="text"
          name=""
          placeholder="Beschreibung"
          formControlName="description"
          id=""
        />
      </label>
      <label>
        <input
          type="datetime-local"
          name=""
          [valueAsNumber]="form.get('date')?.value | date: 'yyyy-MM-ddTHH:mm'"
          formControlName="date"
          id=""
        />
      </label>

      <div class="auth-form__action">
        <button [disabled]="form.invalid" type="submit">Speichern</button>
      </div>
      <div class="auth-form__action">
        <button [routerLink]="['..']">Zurück</button>
      </div>
    </form>
  </div>`,
})
export class PlanComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    date: [new Date(), Validators.required],
  });

  ngOnInit() {
    console.log(this.form.value);
  }

  onSend() {
    console.log(this.form.value);
  }
}
