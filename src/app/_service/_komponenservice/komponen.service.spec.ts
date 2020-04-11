import { TestBed } from '@angular/core/testing';

import { KomponenService } from './komponen.service';

describe('KomponenService', () => {
  let service: KomponenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KomponenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
