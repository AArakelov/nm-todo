import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {RouterOutlet}                                       from '@angular/router';
import {TodoService}                                        from '@features/todo/data-access/todo.service';
import {HeaderComponent}                                    from '@shared/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'nm-todo';
  todoService = inject(TodoService)

  ngOnInit() {
    this.todoService.loadTodos().subscribe(() => {
    });
  }

}
