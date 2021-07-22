import { TestBed } from '@angular/core/testing';

import { ExpressoesService } from './expressoes.service';

describe('ExpressoesService', () => {
  let service: ExpressoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpressoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
