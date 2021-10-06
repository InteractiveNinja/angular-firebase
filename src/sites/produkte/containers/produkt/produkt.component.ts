import { Component, OnInit } from '@angular/core';
import { Produkt, ProdukteService } from '../../service/produkte.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

@Component({
  selector: 'plan',
  styleUrls: ['./produkt.component.scss'],
  template: ` <div>
    <plan-form
      [produkt]="plan$ | async"
      (sendEdit)="editData($event)"
      (send)="saveData($event)"
    >
      <h1>Produkt {{ (plan$ | async) ? 'bearbeiten' : 'erstellen' }}</h1>
    </plan-form>
  </div>`,
})
export class ProduktComponent implements OnInit {
  plan$: Observable<Produkt> | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ProdukteService
  ) {}

  ngOnInit() {
    this.plan$ = this.route.params.pipe(
      pluck('id'),
      switchMap((id) => {
        return this.service.getPlan(id);
      })
    );
  }

  saveData(plan: Produkt) {
    this.service.addPlan(plan).then(() => {
      this.router.navigate(['/plans']);
    });
  }
  editData(plan: Produkt) {
    this.service.editPlan(plan).then(() => {
      this.router.navigate(['/plans']);
    });
  }
}
