/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ScriptionService } from './Scription.service';

describe('Service: Scription', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScriptionService]
    });
  });

  it('should ...', inject([ScriptionService], (service: ScriptionService) => {
    expect(service).toBeTruthy();
  }));
});
