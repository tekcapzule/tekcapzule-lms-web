import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSignupComponent } from './confirm-signup.component';

describe('ConfirmSignupComponent', () => {
  let component: ConfirmSignupComponent;
  let fixture: ComponentFixture<ConfirmSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmSignupComponent]
    });
    fixture = TestBed.createComponent(ConfirmSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
