import { TestBed } from '@angular/core/testing';

import { FluidOutputChartService } from './fluid-output-chart.service';

describe('FluidOutputChartService', () => {
  let service: FluidOutputChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FluidOutputChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
