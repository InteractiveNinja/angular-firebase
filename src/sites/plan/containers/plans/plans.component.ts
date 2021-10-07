import { Component, OnDestroy, OnInit } from '@angular/core';
import { Plan, PlanService } from '../../service/plan.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '../../../../store';
import { Router } from '@angular/router';

@Component({
  selector: 'plans',
  styleUrls: ['./plans.component.scss'],
  template: ` <div class="plan">
    <div class="plan__title">
      <i class="bi-caret-right-fill"></i>
      <h1>Pläne</h1>
      <a class="btn__add" [routerLink]="['/plans/new']">Add</a>
    </div>
    <div *ngIf="plan$ | async as plans; else loading">
      <plan-item
        class="message"
        *ngFor="let plan of plans"
        [plan]="plan"
        (edit)="edit($event)"
        (delete)="delete($event)"
      ></plan-item>
      <div class="message" *ngIf="!plans.length">
        <img src="assets/face.svg" />
        Nichts gefunden
      </div>
    </div>
    <ng-template #loading>
      <div class="message"><img src="assets/loading.svg" /> Suche..</div>
    </ng-template>
  </div>`,
})
export class PlansComponent implements OnInit, OnDestroy {
  plan$: Observable<Plan[]> | undefined;
  subscription: Subscription | undefined;

  constructor(
    private store: Store,
    private service: PlanService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.service.plan$?.subscribe();
    this.plan$ = this.store.select('plans');
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  edit(plan: Plan) {
    this.router.navigate(['/plans/new', { id: plan.$key }]);
  }

  delete(plan: Plan) {
    if (confirm(`Möchtest du den Eintrag "${plan.title}" löschen?`))
      this.service.removePlan(plan);
  }
}
