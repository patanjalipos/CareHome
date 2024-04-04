import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskPhysicalDependencyAssessmentComponent } from './risk-physical-dependency-assessment.component';

describe('RiskPhysicalDependencyAssessmentComponent', () => {
  let component: RiskPhysicalDependencyAssessmentComponent;
  let fixture: ComponentFixture<RiskPhysicalDependencyAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskPhysicalDependencyAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskPhysicalDependencyAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
