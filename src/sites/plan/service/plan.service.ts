import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Store } from '../../../store';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export interface Plan {
  title: string;
  description: string;
  date: string;
  $key: string;
}

@Injectable()
export class PlanService {
  plan$: Observable<Plan[]> | undefined;
  useruid: string | undefined;

  constructor(
    private fb: AngularFireDatabase,
    private store: Store,
    private fs: AngularFireAuth
  ) {
    this.fs.onAuthStateChanged((user) => {
      if (user) {
        this.useruid = user.uid;
        this.plan$ = this.fb
          .list<Plan>(`plans/${user.uid}`)
          .snapshotChanges()
          .pipe(
            map((snapshot) => {
              let plans: Plan[] = snapshot.map((mm) => {
                return {
                  ...(mm.payload.val() as Plan),
                  $key: mm.key || '',
                };
              });
              return plans;
            }),
            tap((plans) => {
              this.store.set('plans', plans);
            })
          );
      }
    });
  }

  addPlan(plan: Plan) {
    return this.fb.list<Plan>(`plans/${this.useruid}`).push(plan);
  }

  removePlan(plan: Plan) {
    return this.fb.list<Plan>(`plans/${this.useruid}/${plan.$key}`).remove();
  }

  getPlan(id: string): Observable<Plan> {
    return this.store.select<Plan[]>('plans').pipe(
      filter((f) => f != undefined),
      map((f) => {
        return f.filter((f) => f.$key == id)[0];
      })
    );
  }

  editPlan(plan: Plan) {
    const { $key, ...item } = plan;
    return this.fb.object<Plan>(`plans/${this.useruid}/${$key}`).update(item);
  }
}
