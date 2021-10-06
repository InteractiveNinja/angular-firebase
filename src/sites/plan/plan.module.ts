import { NgModule } from '@angular/core';
import { PlansComponent } from './containers/plans/plans.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth/shared/guards/auth.guard';

import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { PlanService } from './service/plan.service';
import { PlanComponent } from './containers/plan/plan.component';
import { PlanFormComponent } from './containers/plan/component/plan-form.component';
import { PlanItemComponent } from './containers/plans/components/plan-item.component';

export const ROUTES: Routes = [
  {
    path: 'plans',
    component: PlansComponent,
    canActivate: [AuthGuard],
  },
  { path: 'plans/new', component: PlanComponent, canActivate: [AuthGuard] },
  { path: 'plans/:id', component: PlanComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    PlansComponent,
    PlanComponent,
    PlanFormComponent,
    PlanItemComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    AngularFireDatabaseModule,
  ],
  exports: [PlansComponent, PlanComponent],
  providers: [PlanService],
})
export class PlanModule {}
