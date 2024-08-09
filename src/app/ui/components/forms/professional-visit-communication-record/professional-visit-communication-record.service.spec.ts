import { TestBed } from '@angular/core/testing';

import { ProfessionalVisitCommunicationRecordService } from './professional-visit-communication-record.service';

describe('ProfessionalVisitCommunicationRecordService', () => {
  let service: ProfessionalVisitCommunicationRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessionalVisitCommunicationRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
