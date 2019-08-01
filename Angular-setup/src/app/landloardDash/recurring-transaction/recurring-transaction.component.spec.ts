import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringTransactionComponent } from './recurring-transaction.component';

describe('RecurringTransactionComponent', () => {
  let component: RecurringTransactionComponent;
  let fixture: ComponentFixture<RecurringTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurringTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurringTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
