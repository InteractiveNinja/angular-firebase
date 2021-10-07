import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Produkt } from '../../../service/produkte.service';

@Component({
  selector: 'produkt-item',
  styleUrls: ['./produkt-items.component.scss'],
  template: ` <div class="item">
    <div class="item__box">
      <div>
        {{ plan?.title }}
      </div>
    </div>
    <div class="item__options">
      <div>
        <span (click)="deleteItem()"><i class="bi-trash-fill trash"></i></span>
      </div>
      <div>
        <span (click)="editItem()"><i class="bi-pencil-fill edit"></i></span>
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
