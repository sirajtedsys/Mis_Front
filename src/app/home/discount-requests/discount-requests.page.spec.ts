import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiscountRequestsPage } from './discount-requests.page';

describe('DiscountRequestsPage', () => {
  let component: DiscountRequestsPage;
  let fixture: ComponentFixture<DiscountRequestsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
