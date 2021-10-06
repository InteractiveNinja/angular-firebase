import { NgModule } from '@angular/core';
import { ProdukteComponent } from './containers/produkte/produkte.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth/shared/guards/auth.guard';

import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ProdukteService } from './service/produkte.service';
import { ProduktComponent } from './containers/produkt/produkt.component';
import { ProduktFormComponent } from './containers/produkt/component/produkt-form.component';
import { ProduktItemComponent } from './containers/produkte/components/produkt-item.component';

export const ROUTES: Routes = [
  {
    path: 'produkte',
    component: ProdukteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'produkte/new',
    component: ProduktComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'produkte/:id',
    component: ProduktComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    ProdukteComponent,
    ProduktComponent,
    ProduktFormComponent,
    ProduktItemComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    AngularFireDatabaseModule,
  ],
  exports: [ProdukteComponent, ProduktComponent],
  providers: [ProdukteService],
})
export class ProdukteModule {}
