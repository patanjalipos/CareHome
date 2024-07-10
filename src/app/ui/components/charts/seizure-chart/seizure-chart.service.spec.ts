import { TestBed } from '@angular/core/testing';

import { SeizureChartService } from './seizure-chart.service';

describe('SeizureChartService', () => {
  let service: SeizureChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeizureChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
