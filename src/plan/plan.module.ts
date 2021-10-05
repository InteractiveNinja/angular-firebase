import { NgModule } from '@angular/core';
import { PlanComponent } from './containers/plan.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/shared/guards/auth.guard';

export const ROUTES: Routes = [
  {
    path: 'plan',
    component: PlanComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [PlanComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(ROUTES)],
  exports: [PlanComponent],
})
export class PlanModule {}
