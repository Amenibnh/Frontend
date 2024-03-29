import { TestBed } from '@angular/core/testing';

import { GetAllRepaService } from './get-all-repa.service';

describe('GetAllRepaService', () => {
  let service: GetAllRepaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllRepaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
