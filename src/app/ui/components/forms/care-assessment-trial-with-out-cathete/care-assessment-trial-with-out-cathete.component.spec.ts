import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareAssessmentTrialWithOutCatheteComponent } from './care-assessment-trial-with-out-cathete.component';

describe('CareAssessmentTrialWithOutCatheteComponent', () => {
  let component: CareAssessmentTrialWithOutCatheteComponent;
  let fixture: ComponentFixture<CareAssessmentTrialWithOutCatheteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareAssessmentTrialWithOutCatheteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareAssessmentTrialWithOutCatheteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
