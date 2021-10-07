import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Store } from '../../../store';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export interface Produkt {
  title: string;
  description: string;
  price: number;
  type: string;
  verbrauch: {
    menge: number;
  };
  gebrauch: {
    von: string;
    bis: string;
  };
  $key: string;
}

@Injectable()
export class ProdukteService {
  plan$: Observable<Produkt[]> | undefined;
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
          .list<Produkt>(`produkte/${user.uid}`)
          .snapshotChanges()
          .pipe(
            map((snapshot) => {
              let produkts: Produkt[] = snapshot.map((mm) => ({
                ...(mm.payload.val() as Produkt),
                $key: mm.key || '',
              }));
              return produkts;
            }),
            tap((plans) => {
              this.store.set('produkte', plans);
            })
          );
      }
    });
  }

  addPlan(plan: Produkt) {
    return this.fb.list<Produkt>(`produkte/${this.useruid}`).push(plan);
  }

  removePlan(plan: Produkt) {
    return this.fb
      .object<Produkt>(`produkte/${this.useruid}/${plan.$key}`)
      .remove();
  }

  getPlan(id: string): Observable<Produkt> {
    return this.store.select<Produkt[]>('produkte').pipe(
      filter((f) => f != undefined),
      map((f) => {
        return f.filter((f) => f.$key == id)[0];
      })
    );
  }

  editPlan(plan: Produkt) {
    const { $key, ...item } = plan;
    return this.fb
      .object<Produkt>(`produkte/${this.useruid}/${$key}`)
      .update(item);
  }
}
