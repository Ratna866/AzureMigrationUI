import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlluserdetailsComponent } from './alluserdetails.component';

describe('AlluserdetailsComponent', () => {
  let component: AlluserdetailsComponent;
  let fixture: ComponentFixture<AlluserdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlluserdetailsComponent]
    });
    fixture = TestBed.createComponent(AlluserdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
