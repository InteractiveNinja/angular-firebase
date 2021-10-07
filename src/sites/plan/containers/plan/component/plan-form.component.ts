import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plan } from '../../../service/plan.service';

@Component({
  selector: 'plan-form',
  styleUrls: ['./plan-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="auth-form">
    <ng-content select="h1"></ng-content>
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
        <input type="datetime-local" name="" formControlName="date" id="" />
      </label>

      <div class="auth-form__action">
        <button [disabled]="form.invalid" type="submit">Speichern</button>
      </div>
      <div class="auth-form__action">
        <button
          type="button"
          [routerLink]="['/plans']"
          [class.dirty]="form.dirty"
        >
          {{ form.dirty ? 'Abbrechen' : 'Zurück' }}
        </button>
      </div>
    </form>
  </div>`,
})
export class PlanFormComponent implements OnInit {
  @Input()
  plan: Plan | null | undefined;
  @Output()
  send: EventEmitter<Plan> = new EventEmitter<Plan>();
  @Output()
  sendEdit: EventEmitter<Plan> = new EventEmitter<Plan>();
  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.plan) this.form.patchValue(this.plan);
  }

  onSend() {
    if (this.plan) {
      this.sendEdit.emit({ ...this.form.value, $key: this.plan.$key });
    } else {
      this.send.emit(this.form.value);
    }
  }
}
