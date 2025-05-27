import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PresenceOptionsPage } from './presence-options.page';

describe('PresenceOptionsPage', () => {
  let component: PresenceOptionsPage;
  let fixture: ComponentFixture<PresenceOptionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
