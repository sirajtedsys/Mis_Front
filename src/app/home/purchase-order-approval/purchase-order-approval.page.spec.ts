import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchaseOrderApprovalPage } from './purchase-order-approval.page';

describe('PurchaseOrderApprovalPage', () => {
  let component: PurchaseOrderApprovalPage;
  let fixture: ComponentFixture<PurchaseOrderApprovalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderApprovalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
