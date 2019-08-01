import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantSecurityComponent } from './tenant-security.component';

describe('TenantSecurityComponent', () => {
  let component: TenantSecurityComponent;
  let fixture: ComponentFixture<TenantSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
