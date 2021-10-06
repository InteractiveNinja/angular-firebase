import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { Store } from '../store';

// feature modules

import { AuthModule } from '../auth/auth.module';

// containers
import { AppComponent } from './containers/app.component';

// components
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { PlansComponent } from '../sites/containers/plans/plans.component';
import { PlanModule } from '../sites/plan.module';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'plans',
  },
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthModule,
    PlanModule,
  ],
  declarations: [AppComponent, AppNavComponent, AppHeaderComponent],
  providers: [Store],
  bootstrap: [AppComponent],
})
export class AppModule {}
