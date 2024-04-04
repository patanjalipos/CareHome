import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarePersonalEmergencyEvacuationPlanComponent } from './care-personal-emergency-evacuation-plan.component';

describe('CarePersonalEmergencyEvacuationPlanComponent', () => {
  let component: CarePersonalEmergencyEvacuationPlanComponent;
  let fixture: ComponentFixture<CarePersonalEmergencyEvacuationPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarePersonalEmergencyEvacuationPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarePersonalEmergencyEvacuationPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
