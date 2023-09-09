import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppServerdataComponent } from './app-serverdata.component';

describe('AppServerdataComponent', () => {
  let component: AppServerdataComponent;
  let fixture: ComponentFixture<AppServerdataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppServerdataComponent]
    });
    fixture = TestBed.createComponent(AppServerdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
