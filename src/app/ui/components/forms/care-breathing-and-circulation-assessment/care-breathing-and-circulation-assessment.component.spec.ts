import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareBreathingAndCirculationAssessmentComponent } from './care-breathing-and-circulation-assessment.component';

describe('CareBreathingAndCirculationAssessmentComponent', () => {
  let component: CareBreathingAndCirculationAssessmentComponent;
  let fixture: ComponentFixture<CareBreathingAndCirculationAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareBreathingAndCirculationAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareBreathingAndCirculationAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
