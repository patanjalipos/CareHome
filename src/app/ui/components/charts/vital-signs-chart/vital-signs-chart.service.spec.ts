import { TestBed } from '@angular/core/testing';

import { VitalSignsChartService } from './vital-signs-chart.service';

describe('VitalSignsChartService', () => {
  let service: VitalSignsChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VitalSignsChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
