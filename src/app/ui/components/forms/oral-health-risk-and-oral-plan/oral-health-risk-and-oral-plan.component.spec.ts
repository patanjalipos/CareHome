import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OralHealthRiskAndOralPlanComponent } from './oral-health-risk-and-oral-plan.component';

describe('OralHealthRiskAndOralPlanComponent', () => {
  let component: OralHealthRiskAndOralPlanComponent;
  let fixture: ComponentFixture<OralHealthRiskAndOralPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OralHealthRiskAndOralPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OralHealthRiskAndOralPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
