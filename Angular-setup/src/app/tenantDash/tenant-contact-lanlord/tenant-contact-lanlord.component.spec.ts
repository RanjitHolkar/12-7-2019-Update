import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantContactLanlordComponent } from './tenant-contact-lanlord.component';

describe('TenantContactLanlordComponent', () => {
  let component: TenantContactLanlordComponent;
  let fixture: ComponentFixture<TenantContactLanlordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantContactLanlordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantContactLanlordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
