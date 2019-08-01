import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantPayrentComponent } from './tenant-payrent.component';

describe('TenantPayrentComponent', () => {
  let component: TenantPayrentComponent;
  let fixture: ComponentFixture<TenantPayrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantPayrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantPayrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
