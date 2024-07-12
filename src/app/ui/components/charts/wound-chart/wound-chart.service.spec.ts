import { TestBed } from '@angular/core/testing';

import { WoundChartService } from './wound-chart.service';

describe('WoundChartService', () => {
  let service: WoundChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WoundChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
