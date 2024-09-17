import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentCardsPage } from './appointment-cards.page';

describe('AppointmentCardsPage', () => {
  let component: AppointmentCardsPage;
  let fixture: ComponentFixture<AppointmentCardsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentCardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
