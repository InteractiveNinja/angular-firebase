import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Produkt } from '../../../service/produkte.service';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'plan-item',
  styleUrls: ['./produkt-items.component.scss'],
  template: `<div class="item">
    <div class="item__box">
      <div>
        {{ plan?.title }}
      </div>
    </div>
    <div class="item__options">
      <div>
        <span (click)="deleteItem()"><img src="assets/remove.svg" /></span>
      </div>
      <div>
        <span (click)="editItem()"><img src="assets/edit.svg" /></span>
      </div>
    </div>
  </div>`,
})
export class ProduktItemComponent {
  @Input()
  plan: Produkt | undefined;

  @Output()
  edit: EventEmitter<Produkt> = new EventEmitter<Produkt>();
  @Output()
  delete: EventEmitter<Produkt> = new EventEmitter<Produkt>();

  editItem() {
    if (this.plan) this.edit.emit(this.plan);
  }

  deleteItem() {
    if (this.plan) this.delete.emit(this.plan);
  }
}
