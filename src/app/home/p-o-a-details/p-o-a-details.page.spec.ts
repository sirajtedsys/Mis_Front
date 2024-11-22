import { ComponentFixture, TestBed } from '@angular/core/testing';
import { POADetailsPage } from './p-o-a-details.page';

describe('POADetailsPage', () => {
  let component: POADetailsPage;
  let fixture: ComponentFixture<POADetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(POADetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
