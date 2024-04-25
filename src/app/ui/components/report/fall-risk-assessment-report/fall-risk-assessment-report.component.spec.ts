import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FallRiskAssessmentReportComponent } from './fall-risk-assessment-report.component';

describe('FallRiskAssessmentReportComponent', () => {
  let component: FallRiskAssessmentReportComponent;
  let fixture: ComponentFixture<FallRiskAssessmentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FallRiskAssessmentReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FallRiskAssessmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
