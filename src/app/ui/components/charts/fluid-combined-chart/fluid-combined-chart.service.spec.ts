import { TestBed } from '@angular/core/testing';

import { FluidCombinedChartService } from './fluid-combined-chart.service';

describe('FluidCombinedChartService', () => {
  let service: FluidCombinedChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FluidCombinedChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
