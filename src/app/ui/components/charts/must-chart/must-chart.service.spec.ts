import { TestBed } from '@angular/core/testing';

import { MustChartService } from './must-chart.service';

describe('MustChartService', () => {
  let service: MustChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MustChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
