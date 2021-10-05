import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { User } from '../../../auth/shared/service/auth.service';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="app-header">
    <div class="wrapper">
      <img src="/assets/logo.svg" />
      <div *ngIf="user?.auth" class="app-header__user-info">
        <span (click)="logoutUser()"></span>
      </div>
    </div>
  </div>`,
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent {
  @Input()
  user: User | undefined | null;

  @Output()
  logout: EventEmitter<void> = new EventEmitter<void>();

  logoutUser() {
    this.logout.emit();
  }
}
