import { TestBed } from '@angular/core/testing';

import { RestraintChartService } from './restraint-chart.service';

describe('RestraintChartService', () => {
  let service: RestraintChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestraintChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
