import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantNotificationComponent } from './tenant-notification.component';

describe('TenantNotificationComponent', () => {
  let component: TenantNotificationComponent;
  let fixture: ComponentFixture<TenantNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
