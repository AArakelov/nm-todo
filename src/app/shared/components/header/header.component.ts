import {Component}                            from '@angular/core';
import {MatToolbar}                           from '@angular/material/toolbar';
import {MatButton, MatIconButton}             from '@angular/material/button';
import {RouterLink, RouterLinkActive}         from '@angular/router';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon}                              from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    MatButton,
    RouterLink,
    MatMenuTrigger,
    MatIconButton,
    MatMenuItem,
    MatMenu,
    MatIcon,
    RouterLinkActive
  ],
  template: `
    <mat-toolbar color="primary" class="header-toolbar">
      <span class="app-title">MY TODO LIST</span>

      <!-- Desktop navigation -->
      <div class="nav-buttons hide-on-mobile">
        <button
          mat-button routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }" routerLink="/add"
        >Add
        </button>
        <button
          mat-button routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }" routerLink="/list"
        >List
        </button>
        <button
          mat-button routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }" routerLink="/favorite"
        >Favorite
        </button>
      </div>

      <!-- Mobile hamburger -->
      <div class="show-on-mobile">
        <button mat-icon-button [matMenuTriggerFor]="menu">
          <mat-icon>menu</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item routerLink="/add">Add</button>
          <button mat-menu-item routerLink="/list">List</button>
          <button mat-menu-item routerLink="/favorite">Favorite</button>
        </mat-menu>
      </div>
    </mat-toolbar>
  `,
  styles: `
    .header-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .app-title {
      font-weight: bold;
      font-size: 1.2rem;
    }

    .nav-buttons {
      display: flex;
      gap: 1rem;
    }

    .show-on-mobile {
      display: none;
    }

    .hide-on-mobile {
      display: flex;
    }

    @media (max-width: 768px) {
      .show-on-mobile {
        display: block;
      }
      .hide-on-mobile {
        display: none;
      }
    }
  `,
  standalone: true
})
export class HeaderComponent {

}
