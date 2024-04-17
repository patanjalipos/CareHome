import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareSleepAndRestingAssessmentComponent } from './care-sleep-and-resting-assessment.component';

describe('CareSleepAndRestingAssessmentComponent', () => {
  let component: CareSleepAndRestingAssessmentComponent;
  let fixture: ComponentFixture<CareSleepAndRestingAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareSleepAndRestingAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareSleepAndRestingAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
