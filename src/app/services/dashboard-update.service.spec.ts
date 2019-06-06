import { TestBed } from '@angular/core/testing';

import { DashboardUpdateService } from './dashboard-update.service';

describe('DashboardUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardUpdateService = TestBed.get(DashboardUpdateService);
    expect(service).toBeTruthy();
  });
});
