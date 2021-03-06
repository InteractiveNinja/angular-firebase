import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-nav">
      <div class="wrapper">
        <a routerLink="/plans" routerLinkActive="active">Plan</a>
        <a routerLink="/produkte" routerLinkActive="active">Produkte</a>
      </div>
    </div>
  `,
  styleUrls: ['./app-nav.component.scss'],
})
export class AppNavComponent {}
