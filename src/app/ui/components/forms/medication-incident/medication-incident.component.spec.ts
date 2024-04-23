import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationIncidentComponent } from './medication-incident.component';

describe('MedicationIncidentComponent', () => {
  let component: MedicationIncidentComponent;
  let fixture: ComponentFixture<MedicationIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicationIncidentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicationIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
