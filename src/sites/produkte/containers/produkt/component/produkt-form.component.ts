import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produkt } from '../../../service/produkte.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'plan-form',
  styleUrls: ['./produkt-form.component.scss'],
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
        <input
          type="number"
          min="0"
          max="10000"
          name=""
          formControlName="price"
          id=""
          placeholder="Preis"
        />
      </label>

      <div class="auth-form__action">
        <button [disabled]="form.invalid" type="submit">Speichern</button>
      </div>
      <div class="auth-form__action">
        <button
          type="button"
          [routerLink]="['/produkte']"
          [class.dirty]="form.dirty"
        >
          {{ form.dirty ? 'Abbrechen' : 'Zurück' }}
        </button>
      </div>
    </form>
  </div>`,
})
export class ProduktFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  @Input()
  produkt: Produkt | null | undefined;
  ngOnInit() {
    if (this.produkt) this.form.patchValue(this.produkt);
  }

  @Output()
  send: EventEmitter<Produkt> = new EventEmitter<Produkt>();
  @Output()
  sendEdit: EventEmitter<Produkt> = new EventEmitter<Produkt>();
  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
  });

  onSend() {
    if (this.produkt) {
      this.sendEdit.emit({ ...this.form.value, $key: this.produkt.$key });
    } else {
      this.send.emit(this.form.value);
    }
  }
}
