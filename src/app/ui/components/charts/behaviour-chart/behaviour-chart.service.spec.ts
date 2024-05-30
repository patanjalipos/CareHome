import { TestBed } from '@angular/core/testing';

import { BehaviourChartService } from './behaviour-chart.service';

describe('BehaviourChartService', () => {
  let service: BehaviourChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BehaviourChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
