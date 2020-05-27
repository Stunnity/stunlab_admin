import { TestBed } from '@angular/core/testing';

import { LoadInterceptorService } from './load-interceptor.service';

describe('LoadInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadInterceptorService = TestBed.get(LoadInterceptorService);
    expect(service).toBeTruthy();
  });
});
