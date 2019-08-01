import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHouseNavComponent } from './my-house-nav.component';

describe('MyHouseNavComponent', () => {
  let component: MyHouseNavComponent;
  let fixture: ComponentFixture<MyHouseNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyHouseNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHouseNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
