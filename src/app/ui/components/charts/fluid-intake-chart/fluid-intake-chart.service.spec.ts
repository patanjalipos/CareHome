import { TestBed } from '@angular/core/testing';

import { FluidIntakeChartService } from './fluid-intake-chart.service';

describe('FluidIntakeChartService', () => {
  let service: FluidIntakeChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FluidIntakeChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
