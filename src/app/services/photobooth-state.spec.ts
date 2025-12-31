import { TestBed } from '@angular/core/testing';

import { PhotoboothState } from './photobooth-state';

describe('PhotoboothState', () => {
  let service: PhotoboothState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoboothState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
