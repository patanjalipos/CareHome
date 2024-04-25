import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareAssessmentDietaryNotificationComponent } from './care-assessment-dietary-notification.component';

describe('CareAssessmentDietaryNotificationComponent', () => {
  let component: CareAssessmentDietaryNotificationComponent;
  let fixture: ComponentFixture<CareAssessmentDietaryNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareAssessmentDietaryNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareAssessmentDietaryNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
