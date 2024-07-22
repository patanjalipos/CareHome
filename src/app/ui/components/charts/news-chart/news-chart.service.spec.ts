import { TestBed } from '@angular/core/testing';

import { NewsChartService } from './news-chart.service';

describe('NewsChartService', () => {
  let service: NewsChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
