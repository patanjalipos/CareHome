import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareSkinAssessmentComponent } from './care-skin-assessment.component';

describe('CareSkinAssessmentComponent', () => {
  let component: CareSkinAssessmentComponent;
  let fixture: ComponentFixture<CareSkinAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareSkinAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareSkinAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
