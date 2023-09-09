import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicatComponent } from './applicat.component';

describe('ApplicatComponent', () => {
  let component: ApplicatComponent;
  let fixture: ComponentFixture<ApplicatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicatComponent]
    });
    fixture = TestBed.createComponent(ApplicatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
