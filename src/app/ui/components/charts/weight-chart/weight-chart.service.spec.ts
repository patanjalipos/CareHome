import { TestBed } from '@angular/core/testing';

import { WeightChartService } from './weight-chart.service';

describe('WeightChartService', () => {
  let service: WeightChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeightChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
