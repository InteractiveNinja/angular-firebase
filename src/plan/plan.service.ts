import { Injectable, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Store } from '../store';
import { AuthService, User } from '../auth/shared/service/auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export interface Plan {
  id: number;
  title: string;
  description: string;
  until: string;
}

@Injectable()
export class PlanService {
  constructor(
    private fb: AngularFireDatabase,
    private store: Store,
    private fs: AngularFireAuth
  ) {
    this.fs.currentUser.then((user) => {
      this.plan$ = this.fb
        .list<Plan>(`plans/${user?.uid}`)
        .valueChanges()
        .pipe(
          tap((val) => {
            this.store.set('plans', val);
          })
        );
    });
  }
  plan$: Observable<Plan[]> | undefined;
}
