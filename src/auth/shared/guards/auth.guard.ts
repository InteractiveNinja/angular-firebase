import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '../../../store';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store,
    private af: AngularFireAuth,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.af.authState.pipe(
      map((m) => {
        if (!m) {
          this.router.navigate(['/auth/login']);
          return false;
        } else {
          return !!m;
        }
      })
    );
  }
}
