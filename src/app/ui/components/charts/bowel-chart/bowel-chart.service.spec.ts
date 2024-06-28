import { TestBed } from '@angular/core/testing';

import { BowelChartService } from './bowel-chart.service';

describe('BowelChartService', () => {
  let service: BowelChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BowelChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
