import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaveRequestFormPage } from './leave-request-form.page';

describe('LeaveRequestFormPage', () => {
  let component: LeaveRequestFormPage;
  let fixture: ComponentFixture<LeaveRequestFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveRequestFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
