import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespiratoryScreeningQuestionsComponent } from './RespiratoryScreeningQuestionsComponent';

describe('RespiratoryScreeningQuestionsComponent', () => {
  let component: RespiratoryScreeningQuestionsComponent;
  let fixture: ComponentFixture<RespiratoryScreeningQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespiratoryScreeningQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RespiratoryScreeningQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
