import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestLandloardDashComponent } from './request-landloard-dash.component';

describe('RequestLandloardDashComponent', () => {
  let component: RequestLandloardDashComponent;
  let fixture: ComponentFixture<RequestLandloardDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestLandloardDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestLandloardDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
