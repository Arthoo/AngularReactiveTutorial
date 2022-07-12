import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersReactiveComponent } from './users-reactive.component';

describe('UsersReactiveComponent', () => {
  let component: UsersReactiveComponent;
  let fixture: ComponentFixture<UsersReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersReactiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
