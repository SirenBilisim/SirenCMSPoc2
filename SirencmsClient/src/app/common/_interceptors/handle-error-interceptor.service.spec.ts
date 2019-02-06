import { TestBed } from '@angular/core/testing';

import { HandleErrorInterceptorService } from './handle-error-interceptor.service';

describe('HandleErrorInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HandleErrorInterceptorService = TestBed.get(HandleErrorInterceptorService);
    expect(service).toBeTruthy();
  });
});
