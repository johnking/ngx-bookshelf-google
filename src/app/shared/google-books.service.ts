import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Book } from './book';

@Injectable()
export class GoogleBooksService {
  private API_PATH = 'https://www.googleapis.com/books/v1/volumes';
  public loading = false;
  public initialised = false;
  public totalItems = 0;
  public _page = 1;
  public pageSize = 10;
  public query = '';
  public books: Book[];

  constructor(private http: HttpClient) {
  }

  get startIndex() {
    return this.page * this.pageSize;
  }

  get totalPages() {
    try {
      return Math.ceil(this.totalItems / this.pageSize);
    } catch (e) {
      console.error(e);
      return 0;
    }
  }

  get page(): number {
    return this._page;
  }

  set page(val: number) {
    if (val !== this.page) {
      this._page = val;
      this.searchBooks(this.query);
    }
  }

  public searchBooks(queryTitle: string) {
    this.query = queryTitle;
    this.loading = true;
    this.initialised = true;
    this.books = [];
    this.http.get(`${this.API_PATH}?q=${this.query}&maxResults=${this.pageSize}&startIndex=${this.startIndex}`)
      // .map(res => res.json())
      //
      .do(data => {
        // console.log(data);
        this.totalItems = data['totalItems'];
      })
      .map(data => {
        return data['items'] ? data['items'] : [];
      })
      .map(items => {
        return items.map(item => this.bookFactory(item));
      })
      // .do(books => console.log(books))
      .do(_ => this.loading = false)
      .subscribe((books) => this.books = books);
  }

  retrieveBook(bookId: string) {
    return this.http.get(`${this.API_PATH}/${bookId}`)
      // .map(res => res.json())
      .map(item => this.bookFactory(item));
  }

  private bookFactory(item: any): Book {
    return new Book(
      item.id,
      item.volumeInfo.title,
      item.volumeInfo.subtitle,
      item.volumeInfo.authors,
      item.volumeInfo.publisher,
      item.volumeInfo.publishedDate,
      item.volumeInfo.description,
      item.volumeInfo.categories ? item.volumeInfo.categories.map((cItem) => cItem.split('/').pop().trim()) : ['N/A'],
      item.volumeInfo.imageLinks.thumbnail,
      item.volumeInfo.imageLinks.smallThumbnail
    );
  }
}
