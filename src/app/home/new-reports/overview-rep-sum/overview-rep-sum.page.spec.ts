import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverviewRepSumPage } from './overview-rep-sum.page';

describe('OverviewRepSumPage', () => {
  let component: OverviewRepSumPage;
  let fixture: ComponentFixture<OverviewRepSumPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewRepSumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
