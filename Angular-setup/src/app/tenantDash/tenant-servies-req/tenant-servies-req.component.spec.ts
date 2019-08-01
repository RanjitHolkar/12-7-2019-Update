import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantServiesReqComponent } from './tenant-servies-req.component';

describe('TenantServiesReqComponent', () => {
  let component: TenantServiesReqComponent;
  let fixture: ComponentFixture<TenantServiesReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantServiesReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantServiesReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
