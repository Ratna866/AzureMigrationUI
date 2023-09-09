import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteappComponent } from './deleteapp.component';

describe('DeleteappComponent', () => {
  let component: DeleteappComponent;
  let fixture: ComponentFixture<DeleteappComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteappComponent]
    });
    fixture = TestBed.createComponent(DeleteappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
