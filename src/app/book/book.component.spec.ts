import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { ActivatedRoute, ActivatedRouteStub, fakeGoogleBooks, Router, RouterStub } from '../../testing';

import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MyCustomMaterialModule } from '../my-custom-material/my-custom-material.module';

import { Book } from '../shared/book';
import { BookComponent } from './book.component';
import { GoogleBooksService } from '../shared/google-books.service';
import { LibraryService } from '../shared/library.service';

describe('BookComponent', () => {

  let activatedRoute: ActivatedRouteStub;
  let comp: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  const expectedBook: Book = fakeGoogleBooks[0];

  let gbService: GoogleBooksService;
  let libraryService: LibraryService;

  describe(`setup without 'bookId' in activatedRoute.paramMap`, () => {
    beforeEach(() => {
      activatedRoute = new ActivatedRouteStub();
    });

    // async setup for external template and style.
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientModule,
          MyCustomMaterialModule
        ],
        declarations: [
          BookComponent,
        ],
        providers: [
          GoogleBooksService,
          LibraryService,
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useValue: activatedRoute}
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(BookComponent);
      comp = fixture.componentInstance;

      gbService = fixture.debugElement.injector.get(GoogleBooksService);
      spyOn(gbService, 'retrieveBook').and.returnValue(Observable.of(expectedBook));

      libraryService = fixture.debugElement.injector.get(LibraryService);

      fixture.detectChanges();
    });

    it(`it should cover false branch test in constructor`, () => {
      // this setup only to make 100% brach test coverage.
    });
  }); // end of ... without 'bookId'

  describe(`setup with 'bookId' set in activatedRoute.paramMap`, () => {

    beforeEach(() => {
      activatedRoute = new ActivatedRouteStub();
      activatedRoute.testParamMap = { bookId: expectedBook.id };
    });

    // async setup for external template and style.
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientModule,
          // RouterTestingModule,
          MyCustomMaterialModule
        ],
        declarations: [
          BookComponent,
        ],
        providers: [
          GoogleBooksService,
          LibraryService,
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useValue: activatedRoute}
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(BookComponent);
      comp = fixture.componentInstance;

      gbService = fixture.debugElement.injector.get(GoogleBooksService);
      spyOn(gbService, 'retrieveBook').and.returnValue(Observable.of(expectedBook));

      libraryService = fixture.debugElement.injector.get(LibraryService);

      fixture.detectChanges();
    });

    it('getBook should return a Book', fakeAsync(() => {
      comp.getBook(expectedBook.id);
      tick();
      expect(comp.getCurrentBook()).toBe(expectedBook);
    }));

    it(`can add current book into the libary`, fakeAsync(() => {
      comp.getBook(expectedBook.id);
      tick();
      const currentBook = comp.getCurrentBook();
      comp.addBook(null);
      expect(comp.hasBook(currentBook)).toBeFalsy();
      comp.addBook(currentBook);
      expect(comp.hasBook(currentBook)).toBeTruthy();
    }));

    it(`can remove a existing book from the library`, fakeAsync(() => {
      comp.getBook(expectedBook.id);
      tick();
      const currentBook = comp.getCurrentBook();
      comp.addBook(currentBook);

      comp.removeBook(null);
      expect(comp.hasBook(currentBook)).toBeTruthy();
      comp.removeBook(currentBook);
      expect(comp.hasBook(currentBook)).toBeFalsy();
    }));

    afterAll( () => {
      libraryService.clearLibrary();
    });
  });
});
