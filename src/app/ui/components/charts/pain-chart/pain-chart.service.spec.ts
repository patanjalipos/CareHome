import { TestBed } from '@angular/core/testing';

import { PainChartService } from './pain-chart.service';

describe('PainChartService', () => {
  let service: PainChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PainChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
