import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandSidebarComponent } from './land-sidebar.component';

describe('LandSidebarComponent', () => {
  let component: LandSidebarComponent;
  let fixture: ComponentFixture<LandSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
