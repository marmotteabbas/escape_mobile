import { TestBed } from '@angular/core/testing';

import { TypepageredirectService } from './typepageredirect.service';

describe('TypepageredirectService', () => {
  let service: TypepageredirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypepageredirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
