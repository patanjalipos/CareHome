import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainAssessmentComponent } from './pain-assessment.component';

describe('PainAssessmentComponent', () => {
  let component: PainAssessmentComponent;
  let fixture: ComponentFixture<PainAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
