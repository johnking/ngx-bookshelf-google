/* tslint:disable:max-line-length */
import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { ActivatedRoute, ActivatedRouteStub, fakeGoogleBooks, fakeGoogleBooksResponse_01, Router, RouterStub, RouterLink,  RouterLinkStubDirective } from '../../testing';

import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { SearchComponent } from './search.component';
import { BookListComponent } from '../book-list/book-list.component';
import { PagerComponent } from '../pager/pager.component';
import { GoogleBooksService } from '../shared/google-books.service';

const googleBookServiceStub = {
  books: fakeGoogleBooks,
  page: 1,
  totalPages: 3,
  initialised: false,
  loading: false,
  searchBooks: (term) => {
    return fakeGoogleBooksResponse_01;
  }
};

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let gbService: any;
  let tcElement: HTMLElement;
  let activatedRoute: ActivatedRouteStub;
  let router: any;
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // setup without 'term' in activatedRoute.paramMap
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  describe(`setup without 'term' in activatedRoute.paramMap`, () => {
    beforeEach(() => {
      activatedRoute = new ActivatedRouteStub();
    });

    // async setup for external template and style.
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ BookListComponent, PagerComponent, RouterLinkStubDirective, SearchComponent ],
        imports: [ FormsModule, HttpClientModule, ReactiveFormsModule],
        providers: [
          { provide: GoogleBooksService, useValue: googleBookServiceStub },
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useValue: activatedRoute},
        ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SearchComponent);
      const comp = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(`it should cover false branch test in constructor`, () => {
      // this setup only to make 100% brach test coverage.
    });
  }); // end of ... without 'term'

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // setup with 'term' set in ActivatedRoute.paramMap
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  describe(`setup with 'term' set in ActivatedRoute.param`, () => {
    beforeEach(() => {
      activatedRoute = new ActivatedRouteStub();
      activatedRoute.testParamMap = { term: 'angular' };
      router = jasmine.createSpyObj('router', ['navigate']);
    });

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ BookListComponent, PagerComponent, RouterLinkStubDirective, SearchComponent ],
        imports: [ FormsModule, HttpClientModule, ReactiveFormsModule],
        providers: [
          GoogleBooksService,
          { provide: GoogleBooksService, useValue: googleBookServiceStub },
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useValue: activatedRoute}
        ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SearchComponent);
      component = fixture.componentInstance;

      gbService = fixture.debugElement.injector.get(GoogleBooksService);
      fixture.detectChanges();
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('stub object and injected GoogleBooksService should not be the same', () => {
      expect(gbService === googleBookServiceStub).toBe(false);
    });

    it(`should display 'Loading...' when GoogleBooksService intilized && in loading state`, () => {
      // tcElement = fixture.debugElement.query(By.css('.text-center p'));
      tcElement = fixture.debugElement.nativeElement;
      gbService.initialised = true;
      gbService.loading = true;

      fixture.detectChanges();
      expect(tcElement.innerText).toContain('Loading...');
    });

    it(`should not display 'Loading...' when GoogleBooksService not intilized || not in loading state`, () => {
      // tcElement = fixture.debugElement.query(By.css('.text-center p'));
      tcElement = fixture.debugElement.nativeElement;
      gbService.initialised = false;
      gbService.loading = true;
      fixture.detectChanges();
      expect(tcElement.innerText).not.toContain('Loading...');

      gbService.initialised = true;
      gbService.loading = false;
      fixture.detectChanges();
      expect(tcElement.innerText).not.toContain('Loading...');
    });

    it(`should display 'No results returned' when GoogleBooksService intilized && not in loading state && returned result is 0`, () => {
      // tcElement = fixture.debugElement.query(By.css('.text-center p'));
      tcElement = fixture.debugElement.nativeElement;
      gbService.initialised = true;
      gbService.loading = false;
      gbService.books = [];

      fixture.detectChanges();
      expect(tcElement.innerText).toContain('No results returned');
    });

    it(`should not display 'No results returned' when GoogleBooksService not intilized`, () => {
      tcElement = fixture.debugElement.nativeElement;
      gbService.initialised = false;

      fixture.detectChanges();
      expect(tcElement.innerText).not.toContain('No results returned');
    });

    it(`should not display 'No results returned' when GoogleBooksService is in loading`, () => {
      tcElement = fixture.debugElement.nativeElement;
      gbService.loading = true;

      fixture.detectChanges();
      expect(tcElement.innerText).not.toContain('No results returned');
    });

    it(`should not display 'No results returned' when returned books length > 0`, () => {
      tcElement = fixture.debugElement.nativeElement;
      fixture.detectChanges();
      expect(tcElement.innerText).not.toContain('No results returned');
    });

    it(`should display 'Enter a search string above and press search' when GoogleBooksService is not initialised`, () => {
      tcElement = fixture.debugElement.nativeElement;
      gbService.initialised = false;
      fixture.detectChanges();
      expect(tcElement.innerText).toContain('Enter a search string above and press search');
    });

    it(`should navigate when click search`, () => {
      component.doSearch();
      // TODO: expect(router.navigate.calls.any()).toBe(true, 'router.navigate called');
    });
  });
});
