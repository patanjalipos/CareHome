import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreAdmissionAssessmentFormsComponent } from './pre-admission-assessment-forms.component';

describe('PreAdmissionAssessmentFormsComponent', () => {
  let component: PreAdmissionAssessmentFormsComponent;
  let fixture: ComponentFixture<PreAdmissionAssessmentFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreAdmissionAssessmentFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreAdmissionAssessmentFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
