import { TestBed } from '@angular/core/testing';

import { ProfileuserService } from './profileuser.service';

describe('ProfileuserService', () => {
  let service: ProfileuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
