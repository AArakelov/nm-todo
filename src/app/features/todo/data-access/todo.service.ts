import {inject, Injectable, signal}          from '@angular/core';
import {Todo}                                from '@interfaces/client/todo-interface';
import {StorageMap}                          from '@ngx-pwa/local-storage';
import {catchError, delay, EMPTY, take, tap} from 'rxjs';
import {v4 as uuid}                          from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private storage = inject(StorageMap);
  private readonly STORAGE_KEY = 'todos';

  #todosSignal = signal<Todo[]>([]);
  todos = this.#todosSignal.asReadonly();
  #isLoadingSignal = signal(false);
  isLoading = this.#isLoadingSignal.asReadonly();

  addTodo(data: {
    title: string;
    expirationDate: Date;
    expirationTime?: string;
  }) {
    this.#isLoadingSignal.set(true);

    const newTodo: Todo = {
      id: uuid(),
      title: data.title,
      createdAt: new Date().toISOString(),
      expirationDate: data.expirationDate.toISOString(),
      expirationTime: data.expirationTime,
      isFavorite: false,
    };

    this.#todosSignal.update(current => [newTodo, ...current]);

    return this.saveTodos().pipe(
      delay(300),
      tap(() => this.#isLoadingSignal.set(false)),
      catchError(err => {
        console.error('Error saving todo:', err);
        this.#isLoadingSignal.set(false);
        return EMPTY;
      })
    );
  }

  removeTodo(id: string) {
    this.#isLoadingSignal.set(true);

    this.#todosSignal.update(t => t.filter(todo => todo.id !== id));

    return this.saveTodos().pipe(
      delay(300),
      tap(() => this.#isLoadingSignal.set(false)),
      catchError(err => {
        console.error('Error removing todo:', err);
        this.#isLoadingSignal.set(false);
        return EMPTY;
      })
    )
  }

  toggleFavorite(id: string) {
    this.#isLoadingSignal.set(true);

    this.#todosSignal.update(updated =>
      updated.map(todo => todo.id === id ? {...todo, isFavorite: !todo.isFavorite} : todo)
    );

    return this.saveTodos().pipe(
      delay(300),
      tap(() => this.#isLoadingSignal.set(false)),
      catchError(err => {
        console.error('Error toggling favorite:', err);
        this.#isLoadingSignal.set(false);
        return EMPTY;
      })
    );
  }

  loadTodos() {
    this.#isLoadingSignal.set(true);
    return this.storage.get<Todo[]>('todos', {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {type: 'string'},
          title: {type: 'string'},
          createdAt: {type: 'string'},
          expirationDate: {type: 'string'},
          expirationTime: {type: 'string'},
          isFavorite: {type: 'boolean'}
        }
      }
    }).pipe(
      tap((data) => {
        this.#todosSignal.set(data ?? []);
        this.#isLoadingSignal.set(false);
      }),
      catchError(err => {
        console.error('Error loading todos:', err);
        this.#isLoadingSignal.set(false);
        this.#todosSignal.set([]);
        return EMPTY;
      })
    );
  }

  private saveTodos() {
    return this.storage.set(this.STORAGE_KEY, this.#todosSignal()).pipe(
      take(1),
      catchError(err => {
        console.error('Error saving todos:', err);
        return EMPTY;
      })
    );
  }
}
