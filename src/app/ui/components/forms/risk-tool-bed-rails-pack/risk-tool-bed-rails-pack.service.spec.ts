import { TestBed } from '@angular/core/testing';

import { RiskToolBedRailsPackService } from './risk-tool-bed-rails-pack.service';

describe('RiskToolBedRailsPackService', () => {
  let service: RiskToolBedRailsPackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiskToolBedRailsPackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
