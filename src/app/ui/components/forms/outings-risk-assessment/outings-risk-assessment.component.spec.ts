import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutingsRiskAssessmentComponent } from './outings-risk-assessment.component';

describe('OutingsRiskAssessmentComponent', () => {
  let component: OutingsRiskAssessmentComponent;
  let fixture: ComponentFixture<OutingsRiskAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutingsRiskAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutingsRiskAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
