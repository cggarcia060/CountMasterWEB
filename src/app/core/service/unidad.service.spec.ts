/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UnidadService } from './unidad.service';

describe('Service: Unidad', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnidadService]
    });
  });

  it('should ...', inject([UnidadService], (service: UnidadService) => {
    expect(service).toBeTruthy();
  }));
});
