import { TestBed } from '@angular/core/testing';

import { AdlChartService } from './adl-chart.service';

describe('AdlChartService', () => {
  let service: AdlChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdlChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
