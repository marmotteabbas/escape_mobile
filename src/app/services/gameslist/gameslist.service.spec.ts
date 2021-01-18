import { TestBed } from '@angular/core/testing';

import { GameslistService } from './gameslist.service';

describe('GameslistService', () => {
  let service: GameslistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameslistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
