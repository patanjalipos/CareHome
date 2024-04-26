import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareAssessmentMyEpilepsyComponent } from './care-assessment-my-epilepsy.component';

describe('CareAssessmentMyEpilepsyComponent', () => {
  let component: CareAssessmentMyEpilepsyComponent;
  let fixture: ComponentFixture<CareAssessmentMyEpilepsyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareAssessmentMyEpilepsyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareAssessmentMyEpilepsyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
