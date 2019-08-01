import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactLandlordComponent } from './contact-landlord.component';

describe('ContactLandlordComponent', () => {
  let component: ContactLandlordComponent;
  let fixture: ComponentFixture<ContactLandlordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactLandlordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactLandlordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
