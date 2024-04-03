import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentPreferencesComponent } from './resident-preferences.component';


describe('ResidentPreferencesComponent', () => {
  let component: ResidentPreferencesComponent;
  let fixture: ComponentFixture<ResidentPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentPreferencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
