/* tslint:disable:max-line-length */

// References: https://medium.com/spektrakel-blog/angular-testing-snippets-httpclient-d1dc2f035eb8

import {TestBed, async, inject, tick, fakeAsync} from '@angular/core/testing';
import {GoogleBooksService} from './google-books.service';
import {HttpModule, BaseRequestOptions, Http, ResponseOptions, Response} from '@angular/http';
import { HttpClientModule, HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {Book} from './book';
import { fakeGoogleBooksResponse_01, fakeGoogleBooksResponse_02  } from '../../testing/';

describe('GoogleBooksService', () => {

  let service: GoogleBooksService;
  let response: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [
        GoogleBooksService,
      ]
    });

    // Returns a service with the MockBackend so we can test with dummy responses
    service = TestBed.get(GoogleBooksService);

  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should return books when searched', fakeAsync(inject([HttpClient, HttpTestingController],
    (http: HttpClient, backend: HttpTestingController) => {
      response = fakeGoogleBooksResponse_01;
      // Perform a request and make sure we get the response we expect
      service.searchBooks('Angular');

      backend.match({
        url: 'https://www.googleapis.com/books/v1/volumes?q=Angular&maxResults=10&startIndex=10'
      })[0].flush(response);

      tick();

      expect(service.books.length).toBe(2);
      expect(service.books[0].id).toBe('js2P_8lbR2wC');
      expect(service.books[0].title).toBe('Fundamentals of Biomechanics');
      expect(service.books[0].subTitle).toBeUndefined();
      expect(service.books[0].authors.length).toBe(1);
      expect(service.books[0].authors[0]).toBe('Duane V. Knudson');
      expect(service.books[0].publisher).toBe('Springer Science & Business Media');
      expect(service.books[0].publishDate).toBe('2003-01-01');
      expect(service.books[0].description).toBe('Fundamentals of Biomechanics introduces the exciting world of how human movement is created and how it can be improved. Teachers, coaches and physical therapists all use biomechanics to help people improve movement and decrease the risk of injury. The book presents a comprehensive review of the major concepts of biomechanics and summarizes them in nine principles of biomechanics. Fundamentals of Biomechanics concludes by showing how these principles can be used by movement professionals to improve human movement. Specific case studies are presented in physical education, coaching, strength and conditioning, and sports medicine.');
      expect(service.books[0].categories.length).toBe(1);
      expect(service.books[0].categories[0]).toBe('Science');
      expect(service.books[0].thumbnail).toBe('http://books.google.com/books/content?id=js2P_8lbR2wC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api');
      expect(service.books[0].smallThumbnail).toBe('http://books.google.com/books/content?id=js2P_8lbR2wC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api');

  })));

  it('should return a single book when requested', fakeAsync(inject([HttpClient, HttpTestingController],
    (http: HttpClient, backend: HttpTestingController) => {

      response = fakeGoogleBooksResponse_02;
      // Perform a request and make sure we get the response we expect
      let book: Book = null;
      service.retrieveBook('js2P_8lbR2wC').subscribe(value => book = value);

      // When the request subscribes for results on a connection, return a fake response
      backend.match({
        url: 'https://www.googleapis.com/books/v1/volumes/js2P_8lbR2wC'
      })[0].flush(response);

      tick();

      expect(book.id).toBe('js2P_8lbR2wC');
      expect(book.title).toBe('Fundamentals of Biomechanics');
      expect(book.subTitle).toBeUndefined();
      expect(book.authors.length).toBe(1);
      expect(book.authors[0]).toBe('Duane V. Knudson');
      expect(book.publisher).toBe('Springer Science & Business Media');
      expect(book.publishDate).toBe('2003');
      expect(book.description).toBe('Fundamentals of Biomechanics introduces the exciting world of how human movement is created and how it can be improved. Teachers, coaches and physical therapists all use biomechanics to help people improve movement and decrease the risk of injury. The book presents a comprehensive review of the major concepts of biomechanics and summarizes them in nine principles of biomechanics. Fundamentals of Biomechanics concludes by showing how these principles can be used by movement professionals to improve human movement. Specific case studies are presented in physical education, coaching, strength and conditioning, and sports medicine.');
      expect(book.categories.length).toBe(1);
      expect(book.categories[0]).toBe('Anatomy & Physiology');
      expect(book.thumbnail).toBe('http://books.google.com/books/content?id=js2P_8lbR2wC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE70arIhUxyg7uWLidD_elcwT-swXCh0ZwHDsKaSkZw6O29stutb8rt__Lg3O7KrDgabhMEmsurZwOj0IOrkGHpOYWxTR3qZQvT5Ei9liYHm6kVDlOLXWgxu6-1Z8QC6hCLAcrf8K&source=gbs_api');
      expect(book.smallThumbnail).toBe('http://books.google.com/books/content?id=js2P_8lbR2wC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE719CoqvZVqt5hDg2Fos9P25E8qCybhReOkcVL6OIcQfwNRn5x7k5rVh3EnYz63lNuBhOb0XMi-IalMjeLzi4lJHRtCHDVBU7d59ub5F957_CS6y-SWxnaf8QmOyc6RHB5vS4dAB&source=gbs_api');

  })));

  it('should perform a search when the page is changed', inject([GoogleBooksService], (injectService: GoogleBooksService) => {
    spyOn(injectService, 'searchBooks').and.returnValue(undefined);
    expect(injectService.page).toBe(1);
    injectService.page = 2;
    expect(injectService.searchBooks).toHaveBeenCalled();
  }));

  it('should return total pages after searched', fakeAsync(inject([HttpClient, HttpTestingController],
    (http: HttpClient, backend: HttpTestingController) => {
      response = fakeGoogleBooksResponse_01;
      // Perform a request and make sure we get the response we expect
      service.searchBooks('Angular');

      backend.match({
        url: 'https://www.googleapis.com/books/v1/volumes?q=Angular&maxResults=10&startIndex=10'
      })[0].flush(response);

      tick();
      expect(service.totalPages).toBeGreaterThan(0);
      service.totalItems = null;
      // service.pageSize = null;
      expect(service.totalPages).toBe(0);
      spyOn(Math, 'ceil').and.callFake(function () { throw new Error('error'); });
      expect(service.totalPages).toBe(0);
      service._page = 1;
      service.page = 1;
      expect(service.page).toBe(1);
      // service.page = 2;
      // expect(service.page).toBe(2);
  })));
});
