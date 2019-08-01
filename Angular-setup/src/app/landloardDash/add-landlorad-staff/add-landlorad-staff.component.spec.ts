import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLandloradStaffComponent } from './add-landlorad-staff.component';

describe('AddLandloradStaffComponent', () => {
  let component: AddLandloradStaffComponent;
  let fixture: ComponentFixture<AddLandloradStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLandloradStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLandloradStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
