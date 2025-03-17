import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpAppointmentStatsPage } from './op-appointment-stats.page';

describe('OpAppointmentStatsPage', () => {
  let component: OpAppointmentStatsPage;
  let fixture: ComponentFixture<OpAppointmentStatsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OpAppointmentStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
