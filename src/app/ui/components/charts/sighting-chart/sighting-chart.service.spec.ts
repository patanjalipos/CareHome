import { TestBed } from '@angular/core/testing';

import { SightingChartService } from './sighting-chart.service';

describe('SightingChartService', () => {
  let service: SightingChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SightingChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
