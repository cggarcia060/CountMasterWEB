import { TestBed } from '@angular/core/testing';

import { ProcessGuard } from './process.guard';

describe('ProcessGuard', () => {
  let guard: ProcessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProcessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
