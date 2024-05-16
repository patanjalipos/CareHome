import { TestBed } from '@angular/core/testing';

import { PositiveBehaviourSupportService } from './positive-behaviour-support.service';

describe('PositiveBehaviourSupportService', () => {
  let service: PositiveBehaviourSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PositiveBehaviourSupportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
