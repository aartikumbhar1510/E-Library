import { TestBed } from '@angular/core/testing';

import { AdashboardService } from './adashboard.service';

describe('AdashboardService', () => {
  let service: AdashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
