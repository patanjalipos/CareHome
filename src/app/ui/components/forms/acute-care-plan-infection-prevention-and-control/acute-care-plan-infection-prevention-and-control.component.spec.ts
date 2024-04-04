import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcuteCarePlanInfectionPreventionAndControlComponent } from './acute-care-plan-infection-prevention-and-control.component';

describe('AcuteCarePlanInfectionPreventionAndControlComponent', () => {
  let component: AcuteCarePlanInfectionPreventionAndControlComponent;
  let fixture: ComponentFixture<AcuteCarePlanInfectionPreventionAndControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcuteCarePlanInfectionPreventionAndControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcuteCarePlanInfectionPreventionAndControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
