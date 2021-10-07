import { Component, OnDestroy, OnInit } from '@angular/core';
import { Produkt, ProdukteService } from '../../service/produkte.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '../../../../store';
import { Router } from '@angular/router';
@Component({
  selector: 'produkte',
  styleUrls: ['./produkte.component.scss'],
  template: ` <div class="plan">
    <div class="plan__title">
      <i class="bi-caret-right-fill"></i>
      <h1>Produkte</h1>
      <a class="btn__add" [routerLink]="['/produkte/new']">Add</a>
    </div>
    <div *ngIf="plan$ | async as plans; else loading">
      <produkt-item
        class="message"
        *ngFor="let plan of plans"
        [plan]="plan"
        (edit)="edit($event)"
        (delete)="delete($event)"
      ></produkt-item>
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
export class ProdukteComponent implements OnInit, OnDestroy {
  plan$: Observable<Produkt[]> | undefined;
  subscription: Subscription | undefined;

  constructor(
    private store: Store,
    private service: ProdukteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.service.plan$?.subscribe();
    this.plan$ = this.store.select('produkte');
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  edit(plan: Produkt) {
    this.router.navigate(['/produkte/new', { id: plan.$key }]);
  }
  delete(plan: Produkt) {
    if (confirm(`Möchtest du den Eintrag "${plan.title}" löschen?`))
      this.service.removePlan(plan);
  }
}
