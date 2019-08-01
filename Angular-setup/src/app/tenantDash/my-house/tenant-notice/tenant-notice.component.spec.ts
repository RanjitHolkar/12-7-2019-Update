import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantNoticeComponent } from './tenant-notice.component';

describe('TenantNoticeComponent', () => {
  let component: TenantNoticeComponent;
  let fixture: ComponentFixture<TenantNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
