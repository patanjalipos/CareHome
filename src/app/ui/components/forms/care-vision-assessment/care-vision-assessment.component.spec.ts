import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareVisionAssessmentComponent } from './care-vision-assessment.component';

describe('CareVisionAssessmentComponent', () => {
  let component: CareVisionAssessmentComponent;
  let fixture: ComponentFixture<CareVisionAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareVisionAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareVisionAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
