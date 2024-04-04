import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareSpeechLanguageSsessmentComponent } from './care-speech-language-ssessment.component';

describe('CareSpeechLanguageSsessmentComponent', () => {
  let component: CareSpeechLanguageSsessmentComponent;
  let fixture: ComponentFixture<CareSpeechLanguageSsessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareSpeechLanguageSsessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareSpeechLanguageSsessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
