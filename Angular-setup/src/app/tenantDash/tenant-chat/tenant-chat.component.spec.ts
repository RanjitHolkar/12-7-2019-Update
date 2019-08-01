import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantChatComponent } from './tenant-chat.component';

describe('TenantChatComponent', () => {
  let component: TenantChatComponent;
  let fixture: ComponentFixture<TenantChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
