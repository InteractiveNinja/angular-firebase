import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Plan } from '../../../service/plan.service';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'plan-item',
  styleUrls: ['./plan-items.component.scss'],
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
export class PlanItemComponent {
  @Input()
  plan: Plan | undefined;

  @Output()
  edit: EventEmitter<Plan> = new EventEmitter<Plan>();
  @Output()
  delete: EventEmitter<Plan> = new EventEmitter<Plan>();

  editItem() {
    if (this.plan) this.edit.emit(this.plan);
  }

  deleteItem() {
    if (this.plan) this.delete.emit(this.plan);
  }
}
