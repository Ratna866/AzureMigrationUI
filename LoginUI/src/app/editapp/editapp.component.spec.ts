import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditappComponent } from './editapp.component';

describe('EditappComponent', () => {
  let component: EditappComponent;
  let fixture: ComponentFixture<EditappComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditappComponent]
    });
    fixture = TestBed.createComponent(EditappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
