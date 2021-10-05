import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterCompoent } from './containers/register.compoent';
import { SharedModule } from '../shared/shared.module';

export const ROUTES: Routes = [
  {
    path: '',
    component: RegisterCompoent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES), SharedModule],
  declarations: [RegisterCompoent],
})
export class RegisterModule {}
