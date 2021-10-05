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
import { PlanComponent } from '../plan/containers/plan.component';
import { PlanModule } from '../plan/plan.module';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'plan',
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
