import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogWithPhonePage } from './log-with-phone.page';

describe('LogWithPhonePage', () => {
  let component: LogWithPhonePage;
  let fixture: ComponentFixture<LogWithPhonePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LogWithPhonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
