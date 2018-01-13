// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// material
import { MyCustomMaterialModule } from './my-custom-material/my-custom-material.module';

// local
import {GoogleBooksService} from './shared/google-books.service';
import {LibraryService} from './shared/library.service';

import {HeaderComponent} from './header/header.component';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { LibraryComponent } from './library/library.component';
import { BookComponent } from './book/book.component';
import { BookListComponent } from './book-list/book-list.component';
import { PagerComponent } from './pager/pager.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    LibraryComponent,
    BookComponent,
    BookListComponent,
    PagerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MyCustomMaterialModule
  ],
  providers: [ GoogleBooksService, LibraryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
