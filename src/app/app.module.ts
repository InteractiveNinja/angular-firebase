import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {Store} from '../store';

// feature modules
import {AuthModule} from '../auth/auth.module';

// containers
import {AppComponent} from './containers/app.component';

// components
import {AppNavComponent} from './components/app-nav/app-nav.component';
import {AppHeaderComponent} from './components/app-header/app-header.component';
import {PlanModule} from '../sites/plan/plan.module';
import {ProdukteModule} from '../sites/produkte/produkte.module';

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
    ProdukteModule,
  ],
  declarations: [AppComponent, AppNavComponent, AppHeaderComponent],
  providers: [Store],
  bootstrap: [AppComponent],
})
export class AppModule {}
