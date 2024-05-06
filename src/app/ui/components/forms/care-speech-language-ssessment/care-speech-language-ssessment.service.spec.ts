import { TestBed } from '@angular/core/testing';

import { CareSpeechLanguageSsessmentService } from './care-speech-language-ssessment.service';

describe('CareSpeechLanguageSsessmentService', () => {
  let service: CareSpeechLanguageSsessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareSpeechLanguageSsessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
