import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpVisitSummaryPage } from './op-visit-summary.page';

describe('OpVisitSummaryPage', () => {
  let component: OpVisitSummaryPage;
  let fixture: ComponentFixture<OpVisitSummaryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OpVisitSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
