import { TestBed } from '@angular/core/testing';

import { CareBreathingCirculationService } from './care-breathing-circulation.service';

describe('CareBreathingCirculationService', () => {
  let service: CareBreathingCirculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareBreathingCirculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
