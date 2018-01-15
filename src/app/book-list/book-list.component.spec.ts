/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BookListComponent } from './book-list.component';
import { Book } from '../shared/book';

@Component({
  template: ''
})
class FakeBookComponent {}

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  const books: Book[] = [
    new Book('001', 'title-001', 'subTitle-001',
      ['John King', 'Billy King'], 'Kingspress', '2018-January-09', 'A demo title-001', ['fiction'], '', ''),
    new Book('002', 'title-002', 'subTitle-002',
      ['John King', 'Billy King'], 'Kingspress', '2018-January-09', 'A demo title-002', ['fiction'], '', '')
  ];

  // async setup for external template and style.
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'book/:bookId', component: FakeBookComponent},
        ])
      ],
      declarations: [
        BookListComponent,
        FakeBookComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    component.books = books;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it(`should have 2 books`, () => {
    expect(component.books.length).toBe(2);
  });

});
