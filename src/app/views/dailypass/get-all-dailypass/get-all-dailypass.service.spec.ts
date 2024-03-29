import { TestBed } from '@angular/core/testing';

import { GetAllDailypassService } from './get-all-dailypass.service';

describe('GetAllDailypassService', () => {
  let service: GetAllDailypassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllDailypassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
