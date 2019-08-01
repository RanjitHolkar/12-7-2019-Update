import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantFilesComponent } from './tenant-files.component';

describe('TenantFilesComponent', () => {
  let component: TenantFilesComponent;
  let fixture: ComponentFixture<TenantFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
