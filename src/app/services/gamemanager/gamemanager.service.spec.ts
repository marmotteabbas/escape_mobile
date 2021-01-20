import { TestBed } from '@angular/core/testing';

import { GamemanagerService } from './gamemanager.service';

describe('GamemanagerService', () => {
  let service: GamemanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamemanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
