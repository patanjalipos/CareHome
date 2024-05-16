import { TestBed } from '@angular/core/testing';

import { HealthcareSupportToolService } from './healthcare-support-tool.service';

describe('HealthcareSupportToolService', () => {
  let service: HealthcareSupportToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthcareSupportToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
