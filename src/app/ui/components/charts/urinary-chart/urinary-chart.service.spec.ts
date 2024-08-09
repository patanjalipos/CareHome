import { TestBed } from '@angular/core/testing';

import { UrinaryChartService } from './urinary-chart.service';

describe('UrinaryChartService', () => {
  let service: UrinaryChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrinaryChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
