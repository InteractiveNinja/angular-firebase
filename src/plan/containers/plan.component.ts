import { Component, OnDestroy, OnInit } from '@angular/core';
import { Plan, PlanService } from '../plan.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '../../store';

@Component({
  selector: 'plan',
  template: `Plans: {{ plan$ | async | json }}`,
})
export class PlanComponent implements OnInit, OnDestroy {
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
