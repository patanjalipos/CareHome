import { TestBed } from '@angular/core/testing';

import { CareEatsAndTreatsService } from './care-eats-and-treats.service';

describe('CareEatsAndTreatsService', () => {
  let service: CareEatsAndTreatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareEatsAndTreatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
