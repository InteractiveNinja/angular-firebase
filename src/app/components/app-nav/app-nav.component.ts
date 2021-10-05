import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-nav">
      <div class="wrapper">
        <a routerLink="/plan" routerLinkActive="active">Plan</a>
      </div>
    </div>
  `,
  styleUrls: ['./app-nav.component.scss'],
})
export class AppNavComponent {}
