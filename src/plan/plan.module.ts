import { NgModule } from '@angular/core';
import { PlanComponent } from './containers/plan.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/shared/guards/auth.guard';

import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { PlanService } from './plan.service';

export const ROUTES: Routes = [
  {
    path: 'plan',
    component: PlanComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [PlanComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    AngularFireDatabaseModule,
  ],
  exports: [PlanComponent],
  providers: [PlanService],
})
export class PlanModule {}
