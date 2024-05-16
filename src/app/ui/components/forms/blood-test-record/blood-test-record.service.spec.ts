import { TestBed } from '@angular/core/testing';

import { BloodTestRecordService } from './blood-test-record.service';

describe('BloodTestRecordService', () => {
  let service: BloodTestRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloodTestRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
