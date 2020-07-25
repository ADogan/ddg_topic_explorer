import { TestBed } from '@angular/core/testing';

import { DdgtopicsService } from './ddgtopics.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';



describe('DdgtopicsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: DdgtopicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = new DdgtopicsService(httpClient);
  });

  it('should call the right api url', () => {
    service.getTopicSummary('breakfast');
    console.log(service);

    const req = httpTestingController.expectOne('https://api.duckduckgo.com/?q=breakfast&format=json&pretty=0');
    expect(req.request.method).toEqual('GET');
    httpTestingController.verify();
  });

  afterEach(() => {
    // assert that there are no more pending requests.
    httpTestingController.verify();
  });
});
