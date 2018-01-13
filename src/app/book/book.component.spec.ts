import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { RouterTestingModule } from '@angular/router/testing';
import { MyCustomMaterialModule } from '../my-custom-material/my-custom-material.module';

import { BookComponent } from './book.component';
import { fakeGoogleBooks } from '../shared/test-helpers';
import { GoogleBooksService } from '../shared/google-books.service';
import { LibraryService } from '../shared/library.service';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let gbService: GoogleBooksService;
  let libraryService: LibraryService;
  let gbSpy: any;

  // async setup for external template and style.
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MyCustomMaterialModule
      ],
      declarations: [
        BookComponent,
      ],
      providers: [
        GoogleBooksService,
        LibraryService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;

    gbService = fixture.debugElement.injector.get(GoogleBooksService);
    gbSpy = spyOn(gbService, 'retrieveBook').and.returnValue(Observable.of(fakeGoogleBooks[0]));

    libraryService = fixture.debugElement.injector.get(LibraryService);

    fixture.detectChanges();
  });

  it('getBook should return a Book', fakeAsync(() => {
    component.getBook('fakeId');
    tick();
    // console.log('...', component.getCurrentBook());
    expect(component.getCurrentBook()).toBeTruthy();
  }));

  it(`can add current book into the libary`, fakeAsync(() => {
    component.getBook('fakeId');
    tick();
    const currentBook = component.getCurrentBook();
    component.addBook(currentBook);
    component.hasBook(currentBook);
  }));

  afterAll( () => {
    libraryService.clearLibrary();
  });
});
