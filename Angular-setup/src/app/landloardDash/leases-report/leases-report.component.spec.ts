import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasesReportComponent } from './leases-report.component';

describe('LeasesReportComponent', () => {
  let component: LeasesReportComponent;
  let fixture: ComponentFixture<LeasesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
