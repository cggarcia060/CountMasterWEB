/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UtilesService } from './Utiles.service';

describe('Service: Utiles', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilesService]
    });
  });

  it('should ...', inject([UtilesService], (service: UtilesService) => {
    expect(service).toBeTruthy();
  }));
});
