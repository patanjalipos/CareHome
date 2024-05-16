import { TestBed } from '@angular/core/testing';

import { SepsisScreeningToolService } from './sepsis-screening-tool.service';

describe('SepsisScreeningToolService', () => {
  let service: SepsisScreeningToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SepsisScreeningToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
