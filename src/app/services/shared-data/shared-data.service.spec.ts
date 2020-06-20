import { TestBed } from '@angular/core/testing';

import { SharedDataService } from './shared-data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';

describe('SharedDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [CookieService]
  }));

  it('should be created', () => {
    const service: SharedDataService = TestBed.get(SharedDataService);
    expect(service).toBeTruthy();
  });
});
