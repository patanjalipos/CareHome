import { TestBed } from '@angular/core/testing';

import { PromotingWellbeingAtHomeService } from './promoting-wellbeing-at-home.service';

describe('PromotingWellbeingAtHomeService', () => {
  let service: PromotingWellbeingAtHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromotingWellbeingAtHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
