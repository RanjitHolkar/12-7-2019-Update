import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMpesaComponent } from './admin-mpesa.component';

describe('AdminMpesaComponent', () => {
  let component: AdminMpesaComponent;
  let fixture: ComponentFixture<AdminMpesaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMpesaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMpesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
