import { TestBed } from '@angular/core/testing';

import { GlasgowComaScaleChartService } from './glasgow-coma-scale-chart.service';

describe('GlasgowComaScaleChartService', () => {
  let service: GlasgowComaScaleChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlasgowComaScaleChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
