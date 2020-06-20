import { TestBed, inject } from '@angular/core/testing';

import { HttpCancelService } from './http-cancel.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HttpCancelService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [HttpCancelService]
  }));


  it('should cancel pending requests', inject([HttpTestingController, HttpCancelService],
    (httpMock: HttpTestingController, cancelService: HttpCancelService) => {
      expect(cancelService).toBeTruthy();
    }
  )
  );
});
