import { TestBed } from '@angular/core/testing';

import { ThePoolActivityLevelService } from './the-pool-activity-level.service';

describe('ThePoolActivityLevelService', () => {
  let service: ThePoolActivityLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThePoolActivityLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
