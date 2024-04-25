import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FallRiskAssessmentComponent } from './fall-risk-assessment.component';

describe('FallRiskAssessmentComponent', () => {
  let component: FallRiskAssessmentComponent;
  let fixture: ComponentFixture<FallRiskAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FallRiskAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FallRiskAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
