import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from } from 'rxjs';
import { Store } from '../../../store';
import { tap } from 'rxjs/operators';

export interface User {
  email: string;
  uid: string;
  auth: boolean;
}

@Injectable()
export class AuthService {
  auth$ = this.af.authState.pipe(
    tap((next) => {
      if (!next) {
        this.store.set('user', null);
        return;
      }
      const user: User = {
        email: next.email || '',
        uid: next.uid,
        auth: true,
      };
      this.store.set('user', user);
    })
  );

  constructor(private af: AngularFireAuth, private store: Store) {}

  get authState() {
    return this.af.authState;
  }

  createUser(email: string, password: string) {
    return from(this.af.createUserWithEmailAndPassword(email, password));
  }

  loginUser(email: string, password: string) {
    return from(this.af.signInWithEmailAndPassword(email, password));
  }

  logoutUser() {
    return from(this.af.signOut());
  }
}
