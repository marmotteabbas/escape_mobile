import { TestBed } from '@angular/core/testing';

import { ParamrouterService } from './paramrouter.service';

describe('ParamrouterService', () => {
  let service: ParamrouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamrouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
