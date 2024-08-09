import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareAssessmentLifeHistoryComponent } from './care-assessment-life-history.component';

describe('CareAssessmentLifeHistoryComponent', () => {
  let component: CareAssessmentLifeHistoryComponent;
  let fixture: ComponentFixture<CareAssessmentLifeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareAssessmentLifeHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareAssessmentLifeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
