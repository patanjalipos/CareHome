import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareAssessmentRespectComponent } from './care-assessment-respect.component';

describe('CareAssessmentRespectComponent', () => {
  let component: CareAssessmentRespectComponent;
  let fixture: ComponentFixture<CareAssessmentRespectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareAssessmentRespectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareAssessmentRespectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
