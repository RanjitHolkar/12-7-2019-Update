import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpLandloardComponent } from './sign-up-landloard.component';

describe('SignUpLandloardComponent', () => {
  let component: SignUpLandloardComponent;
  let fixture: ComponentFixture<SignUpLandloardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpLandloardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpLandloardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
