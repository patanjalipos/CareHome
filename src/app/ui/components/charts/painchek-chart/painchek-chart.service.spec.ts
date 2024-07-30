import { TestBed } from '@angular/core/testing';

import { PainchekChartService } from './painchek-chart.service';

describe('PainchekChartService', () => {
  let service: PainchekChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PainchekChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
