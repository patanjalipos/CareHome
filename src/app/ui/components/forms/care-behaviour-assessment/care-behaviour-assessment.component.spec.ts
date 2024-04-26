import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareBehaviourAssessmentComponent } from './care-behaviour-assessment.component';

describe('CareBehaviourAssessmentComponent', () => {
  let component: CareBehaviourAssessmentComponent;
  let fixture: ComponentFixture<CareBehaviourAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareBehaviourAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareBehaviourAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
