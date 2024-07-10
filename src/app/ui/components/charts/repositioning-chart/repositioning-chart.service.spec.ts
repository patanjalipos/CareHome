import { TestBed } from '@angular/core/testing';

import { RepositioningChartService } from './repositioning-chart.service';

describe('RepositioningChartService', () => {
  let service: RepositioningChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepositioningChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
