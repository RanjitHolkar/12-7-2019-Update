import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantTimelineComponent } from './tenant-timeline.component';

describe('TenantTimelineComponent', () => {
  let component: TenantTimelineComponent;
  let fixture: ComponentFixture<TenantTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
