import { TestBed } from '@angular/core/testing';

import { InfectionChartService } from './infection-chart.service';

describe('InfectionChartService', () => {
  let service: InfectionChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfectionChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
