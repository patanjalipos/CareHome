import { TestBed } from '@angular/core/testing';

import { WaterlowChartService } from './waterlow-chart.service';

describe('WaterlowChartService', () => {
  let service: WaterlowChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaterlowChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
