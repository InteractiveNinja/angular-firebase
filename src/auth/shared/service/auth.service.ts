import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable, of } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private af: AngularFireAuth) {}

  createUser(email: string, password: string) {
    return from(this.af.createUserWithEmailAndPassword(email, password));
  }

  loginUser(email: string, password: string) {
    return from(this.af.signInWithEmailAndPassword(email, password));
  }
}
