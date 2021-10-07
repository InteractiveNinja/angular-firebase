import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { User } from './auth/shared/service/auth.service';
import { Plan } from './sites/plan/service/plan.service';
import { Produkt } from './sites/produkte/service/produkte.service';

export interface State {
  user: User | undefined;
  plans: Plan[] | undefined;
  produkte: Produkt[] | undefined;

  [key: string]: any;
}

const state: State = {
  user: undefined,
  plans: undefined,
  produkte: undefined,
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }
}
