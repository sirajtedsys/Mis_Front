import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesReportSummaryPage } from './sales-report-summary.page';

describe('SalesReportSummaryPage', () => {
  let component: SalesReportSummaryPage;
  let fixture: ComponentFixture<SalesReportSummaryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReportSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
