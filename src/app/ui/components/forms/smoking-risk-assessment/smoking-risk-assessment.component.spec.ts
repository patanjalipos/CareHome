import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmokingRiskAssessmentComponent } from './smoking-risk-assessment.component';

describe('SmokingRiskAssessmentComponent', () => {
  let component: SmokingRiskAssessmentComponent;
  let fixture: ComponentFixture<SmokingRiskAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmokingRiskAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmokingRiskAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
