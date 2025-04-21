import {ChangeDetectionStrategy, Component, inject, Input, NgZone, OnDestroy, OnInit, signal} from '@angular/core';
import {
  Todo
}                                                                                             from '@interfaces/client/todo-interface';
import {
  TodoService
}                                                                                             from '@features/todo/data-access/todo.service';
import {
  MatIcon
}                                                                                             from '@angular/material/icon';
import {
  MatIconButton
}                                                                                             from '@angular/material/button';
import {DatePipe, NgClass}                                                                    from '@angular/common';
import {take}                                                                                 from 'rxjs';

@Component({
  selector: 'app-todo-item',
  imports: [
    MatIcon,
    MatIconButton,
    NgClass,
    DatePipe
  ],
  templateUrl: './todo-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent implements OnInit, OnDestroy {
  @Input({required: true}) todo!: Todo
  timeLeft = signal('');
  todoService = inject(TodoService);
  private zone = inject(NgZone);
  private intervalId!: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    if (this.isToday()) {
      this.updateTimeLeft();
      this.zone.runOutsideAngular(() => {
        this.intervalId = setInterval(() => this.updateTimeLeft(), 1000);
      });
    }
  }

  isToday(): boolean {
    const now = new Date().toDateString();
    const exp = new Date(this.todo.expirationDate).toDateString();
    return now === exp;
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  updateTimeLeft(): void {
    const now = new Date();
    const expDate = new Date(this.todo.expirationDate);

    if (isNaN(expDate.getTime())) {
      this.timeLeft.set('Invalid date');
      return;
    }

    // Handle expirationTime: "hh:mm AM/PM"
    if (this.todo.expirationTime) {
      const time = this.todo.expirationTime.trim();
      const match = time.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);

      if (match) {
        let hours = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);
        const period = match[3].toUpperCase();

        if (period === 'PM' && hours < 12) {
          hours += 12;
        }
        if (period === 'AM' && hours === 12) {
          hours = 0;
        }

        expDate.setHours(hours, minutes, 0, 0);
      } else {
        this.timeLeft.set('Invalid time');
        return;
      }
    } else {
      // если время не указано — считать до конца дня
      expDate.setHours(23, 59, 59, 999);
    }

    const diff = expDate.getTime() - now.getTime();

    if (diff <= 0) {
      this.timeLeft.set('Expired');
      return;
    }

    const h = Math.floor(diff / 1000 / 60 / 60);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    this.timeLeft.set(`${h}h ${m}m ${s}s`);
  }

  onToggleFavorite() {
    this.todoService.toggleFavorite(this.todo.id).pipe(take(1)).subscribe();
  }

  onRemove(): void {
    this.todoService.removeTodo(this.todo.id).pipe(
      take(1)
    ).subscribe();
  }

  isUrgent(): boolean {
    return this.timeLeft().includes('Expired') || this.timeLeft().startsWith('0h');
  }
}
