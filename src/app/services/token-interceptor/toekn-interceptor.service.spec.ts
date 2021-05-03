import { TestBed } from '@angular/core/testing';

import { ToeknInterceptorService } from './toekn-interceptor.service';

describe('ToeknInterceptorService', () => {
  let service: ToeknInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToeknInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
