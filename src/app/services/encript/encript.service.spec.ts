import { TestBed } from '@angular/core/testing';

import { EncriptService } from './encript.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EncriptService', () => {
  let service: EncriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(EncriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
