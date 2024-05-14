import { TestBed } from '@angular/core/testing';

import { ConnectingAndCommunicatingService } from './connecting-and-communicating.service';

describe('ConnectingAndCommunicatingService', () => {
  let service: ConnectingAndCommunicatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectingAndCommunicatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
