import { TestBed } from '@angular/core/testing';

import { OptimaRequestService } from './optima-request.service';

describe('OptimaRequestService', () => {
  let service: OptimaRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptimaRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
