import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plan, PlanService } from '../../service/plan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { mergeMap, pluck, switchMap } from 'rxjs/operators';

@Component({
  selector: 'plan',
  styleUrls: ['./plan.component.scss'],
  template: ` <div>
    <plan-form
      [plan]="plan$ | async"
      (sendEdit)="editData($event)"
      (send)="saveData($event)"
    >
      <h1>Plan {{ (plan$ | async) ? 'bearbeiten' : 'erstellen' }}</h1>
    </plan-form>
  </div>`,
})
export class PlanComponent implements OnInit {
  plan$: Observable<Plan> | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: PlanService
  ) {}

  ngOnInit() {
    this.plan$ = this.route.params.pipe(
      pluck('id'),
      switchMap((id) => {
        return this.service.getPlan(id);
      })
    );
  }

  saveData(plan: Plan) {
    this.service.addPlan(plan).then(() => {
      this.router.navigate(['/plans']);
    });
  }
  editData(plan: Plan) {
    this.service.editPlan(plan).then(() => {
      this.router.navigate(['/plans']);
    });
  }
}
