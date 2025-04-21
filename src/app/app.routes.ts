import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'add',
    loadComponent: () =>
      import('@pages/page-add-todo/page-add-todo.component').then(m => m.PageAddTodoComponent),
  },
  {
    path: 'list',
    loadComponent: () =>
      import('@pages/page-todo-list/page-todo-list.component').then(m => m.PageTodoListComponent),
  },
  {
    path: 'favorite',
    loadComponent: () =>
      import('@pages/page-todo-list/page-todo-list.component').then(m => m.PageTodoListComponent),
  },
  {path: '**', redirectTo: 'list'},
];
