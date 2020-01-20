import { TestBed } from '@angular/core/testing';

import { GlobalValuesService } from './global-values.service';

describe('GlobalValuesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalValuesService = TestBed.get(GlobalValuesService);
    expect(service).toBeTruthy();
  });
});
