import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenatDashComponent } from './tenat-dash.component';

describe('TenatDashComponent', () => {
  let component: TenatDashComponent;
  let fixture: ComponentFixture<TenatDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenatDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenatDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
