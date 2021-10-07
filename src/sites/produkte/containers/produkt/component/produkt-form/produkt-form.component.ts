import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produkt } from '../../../../service/produkte.service';

@Component({
  selector: 'produkt-form',
  styleUrls: ['./produkt-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div class="auth-form">
    <ng-content select="h2"></ng-content>
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
      <div>
        <label>
          <h2>Produkt Typ</h2>
          <product-type formControlName="type"></product-type>
        </label>
      </div>
      <div>
        <div *ngIf="form.value.type == 'verbrauch'" formGroupName="verbrauch">
          <input
            type="number"
            formControlName="menge"
            placeholder="Anzahl an Produkten"
            step="5"
            min="5"
            max="10000"
            value="5"
          />
        </div>
        <div *ngIf="form.value.type == 'gebrauch'" formGroupName="gebrauch">
          <label>
            <p>Von</p>
            <input type="date" formControlName="von" placeholder="Anzahl" />
          </label>
          <label>
            <p>Bis</p>
            <input type="date" formControlName="bis" placeholder="Anzahl" />
          </label>
        </div>
      </div>
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
    {{ form.value | json }}
  </div>`,
})
export class ProduktFormComponent implements OnInit {
  @Input()
  produkt: Produkt | null | undefined;
  @Output()
  send: EventEmitter<Produkt> = new EventEmitter<Produkt>();
  @Output()
  sendEdit: EventEmitter<Produkt> = new EventEmitter<Produkt>();
  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    type: ['verbrauch', Validators.required],
    verbrauch: this.fb.group({
      menge: [''],
    }),
    gebrauch: this.fb.group({
      von: [''],
      bis: [''],
    }),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.produkt) this.form.patchValue(this.produkt);
  }

  onSend() {
    if (this.produkt) {
      this.sendEdit.emit({ ...this.form.value, $key: this.produkt.$key });
    } else {
      this.send.emit(this.form.value);
    }
  }
}
