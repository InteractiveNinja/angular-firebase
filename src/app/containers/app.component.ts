import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '../../store';
import { AuthService, User } from '../../auth/shared/service/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: ` <div class="wrapper">
    <app-header [user]="user$ | async" (logout)="onLogout()"></app-header>
    <app-nav *ngIf="(user$ | async)?.auth"></app-nav>
    <router-outlet></router-outlet>
  </div>`,
})
export class AppComponent implements OnDestroy, OnInit {
  user$: Observable<User> | undefined;
  subscription: Subscription | undefined;
  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select<User>('user');
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onLogout() {
    this.authService.logoutUser().subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
