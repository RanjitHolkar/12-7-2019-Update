import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationLandloardComponent } from './notification-landloard.component';

describe('NotificationLandloardComponent', () => {
  let component: NotificationLandloardComponent;
  let fixture: ComponentFixture<NotificationLandloardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationLandloardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationLandloardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
