import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareHearingAssessmentComponent } from './care-hearing-assessment.component';

describe('CareHearingAssessmentComponent', () => {
  let component: CareHearingAssessmentComponent;
  let fixture: ComponentFixture<CareHearingAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareHearingAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareHearingAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
