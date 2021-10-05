import { Component, OnDestroy, OnInit } from '@angular/core';
import { Plan, PlanService } from '../../plan.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '../../../store';

@Component({
  selector: 'plans',
  styleUrls: ['./plans.component.scss'],
  template: `<div class="plan">
    <div class="plan__title"></div>
    <a class="btn__add" [routerLink]="['/plans/new']">Add</a>
    <div *ngIf="plan$ | async as meals">
      <div *ngIf="!meals.length">Nichts gefunden</div>
    </div>
  </div>`,
})
export class PlansComponent implements OnInit, OnDestroy {
  plan$: Observable<Plan[]> | undefined;
  subscription: Subscription | undefined;

  constructor(private store: Store, private service: PlanService) {}
  ngOnInit() {
    this.subscription = this.service.plan$?.subscribe();
    this.plan$ = this.store.select('plans');
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
