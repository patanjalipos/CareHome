import { TestBed } from '@angular/core/testing';

import { RiskOnTheMoveService } from './risk-on-the-move.service';

describe('RiskOnTheMoveService', () => {
  let service: RiskOnTheMoveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiskOnTheMoveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
