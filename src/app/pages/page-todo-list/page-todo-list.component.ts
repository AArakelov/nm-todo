import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {TodoService}                                          from '@features/todo/data-access/todo.service';
import {Router}                                               from '@angular/router';
import {TodoItemComponent}                                    from '@features/todo/ui/todo-item/todo-item.component';

@Component({
  selector: 'app-page-todo-list',
  imports: [
    TodoItemComponent
  ],
  templateUrl: './page-todo-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './page-todo-list.component.scss'
})
export class PageTodoListComponent {

  filteredTodos = computed(() => {
    const todos = this.todos();
    return this.isFavoriteRoute() ? todos.filter(t => t.isFavorite) : todos;
  });
  otherTodos = computed(() => {
    const now = new Date().toDateString();
    return this.filteredTodos().filter(t => new Date(t.expirationDate).toDateString() !== now);
  });
  todayTodos = computed(() => {
    const now = new Date().toDateString();
    return this.filteredTodos().filter(t => new Date(t.expirationDate).toDateString() === now);
  });
  private readonly todoService = inject(TodoService);
  todos = this.todoService.todos;
  private router = inject(Router);
  isFavoriteRoute = computed(() => this.router.url.includes('favorite'));
}
