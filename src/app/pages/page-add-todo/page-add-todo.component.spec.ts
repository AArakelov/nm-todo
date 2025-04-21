import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAddTodoComponent } from './page-add-todo.component';

describe('PageAddTodoComponent', () => {
  let component: PageAddTodoComponent;
  let fixture: ComponentFixture<PageAddTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageAddTodoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAddTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
