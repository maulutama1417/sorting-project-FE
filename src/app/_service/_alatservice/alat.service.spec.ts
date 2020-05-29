import { TestBed } from '@angular/core/testing';

import { AlatService } from './alat.service';

describe('AlatService', () => {
  let service: AlatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
