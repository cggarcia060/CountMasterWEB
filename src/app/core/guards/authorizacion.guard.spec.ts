import { TestBed } from '@angular/core/testing';

import { AuthorizacionGuard } from './authorizacion.guard';

describe('AuthorizacionGuard', () => {
  let guard: AuthorizacionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorizacionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
