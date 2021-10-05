import { NgModule } from '@angular/core';
import { PlansComponent } from './containers/plans/plans.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/shared/guards/auth.guard';

import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { PlanService } from './plan.service';
import { PlanComponent } from './containers/plan/plan.component';

export const ROUTES: Routes = [
  {
    path: 'plans',
    component: PlansComponent,
    canActivate: [AuthGuard],
  },
  { path: 'plans/new', component: PlanComponent },
];

@NgModule({
  declarations: [PlansComponent, PlanComponent],
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
