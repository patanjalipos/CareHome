import { TestBed } from '@angular/core/testing';

import { BodyMappingRecordService } from './body-mapping-record.service';

describe('BodyMappingRecordService', () => {
  let service: BodyMappingRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodyMappingRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
