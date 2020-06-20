import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [DataService]
  }));


  it('should get fetch data', inject([HttpTestingController, DataService],
    (httpMock: HttpTestingController, appService: DataService) => {
      expect(appService).toBeTruthy();
    }
  )
  );
});
