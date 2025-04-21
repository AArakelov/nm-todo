import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTodoListComponent } from './page-todo-list.component';

describe('PageTodoListComponent', () => {
  let component: PageTodoListComponent;
  let fixture: ComponentFixture<PageTodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTodoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
