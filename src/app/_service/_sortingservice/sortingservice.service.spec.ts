import { TestBed } from '@angular/core/testing';

import { SortingserviceService } from './sortingservice.service';

describe('SortingserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SortingserviceService = TestBed.get(SortingserviceService);
    expect(service).toBeTruthy();
  });
});
