import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HospitalCollectionPage } from './hospital-collection.page';

describe('HospitalCollectionPage', () => {
  let component: HospitalCollectionPage;
  let fixture: ComponentFixture<HospitalCollectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalCollectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
