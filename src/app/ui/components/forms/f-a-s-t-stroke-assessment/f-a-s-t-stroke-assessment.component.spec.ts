import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FASTStrokeAssessmentComponent } from './f-a-s-t-stroke-assessment.component';

describe('FASTStrokeAssessmentComponent', () => {
  let component: FASTStrokeAssessmentComponent;
  let fixture: ComponentFixture<FASTStrokeAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FASTStrokeAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FASTStrokeAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
