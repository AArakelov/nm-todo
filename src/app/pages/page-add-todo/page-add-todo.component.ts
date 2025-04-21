import {ChangeDetectionStrategy, Component, inject, signal}        from '@angular/core';
import {MatButton, MatIconButton}                                  from '@angular/material/button';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel}                          from '@angular/material/form-field';
import {MatDatepicker, MatDatepickerModule}                        from '@angular/material/datepicker';
import {NgxMaterialTimepickerModule}                               from 'ngx-material-timepicker';
import {Router}                                                    from '@angular/router';
import {TodoService}                                               from '@features/todo/data-access/todo.service';
import {MatInput}                                                  from '@angular/material/input';
import {MatNativeDateModule}                                       from '@angular/material/core';
import {MatIcon}                                                   from '@angular/material/icon';
import {expirationTimeValidator}                                   from '@shared/validators/expiration-time-validator';
import {take}                                                      from 'rxjs';

@Component({
  selector: 'app-page-add-todo',
  standalone: true,
  imports: [
    MatIconButton,
    ReactiveFormsModule,
    MatFormField,
    MatDatepicker,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MatButton,
    MatNativeDateModule,
    MatInput,
    MatError,
    MatIcon,
    MatLabel,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './page-add-todo.component.html',
  styleUrl: './page-add-todo.component.scss'
})
export class PageAddTodoComponent {
  submitted = signal(false);
  todoService = inject(TodoService);
  #fb = inject(FormBuilder);
  form = this.#fb.group(
    {
      title: ['', [Validators.required, Validators.maxLength(100)]],
      expirationDate: [null, [Validators.required]],
      expirationTime: [''],
    },
    {
      validators: expirationTimeValidator,
    }
  );
  #router = inject(Router);

  get today(): Date {
    return new Date();
  }

  onSubmit(): void {
    this.submitted.set(true);
    if (this.form.invalid || this.isTimeInvalid()) {
      return;
    }

    const {title, expirationDate, expirationTime} = this.form.value;

    this.todoService.addTodo({
      title: title ?? '',
      expirationDate: expirationDate ? new Date(expirationDate) : new Date(),
      expirationTime: expirationTime ?? undefined,
    }).pipe(take(1)).subscribe(() => {
      this.#router.navigate(['/list']);
    });

  }

  goBack(): void {
    this.#router.navigate(['/list']);
  }

  isControlInvalid(ctrl: string): boolean {
    const control = this.form.get(ctrl);
    return !!control?.invalid && (control?.dirty && control?.touched || this.submitted());
  }

  isTimeInvalid(): boolean {
    const date = this.form.value.expirationDate;
    const time = this.form.value.expirationTime;
    if (!date || !time) {
      return false;
    }

    const now = new Date();
    const [h, m] = time.split(':').map(Number);
    const fullDate = new Date(date);
    fullDate.setHours(h, m, 0, 0);
    return fullDate.getTime() < now.getTime();
  }

}
