import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertPreferencesComponent } from './alert-preferences.component';

describe('AlertPreferencesComponent', () => {
  let component: AlertPreferencesComponent;
  let fixture: ComponentFixture<AlertPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertPreferencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
