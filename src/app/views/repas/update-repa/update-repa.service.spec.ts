import { TestBed } from '@angular/core/testing';

import { UpdateRepaService } from './update-repa.service';

describe('UpdateRepaService', () => {
  let service: UpdateRepaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateRepaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
