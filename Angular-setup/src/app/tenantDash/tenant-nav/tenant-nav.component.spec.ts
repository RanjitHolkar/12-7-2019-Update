import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantNavComponent } from './tenant-nav.component';

describe('TenantNavComponent', () => {
  let component: TenantNavComponent;
  let fixture: ComponentFixture<TenantNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
