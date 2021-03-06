import {Component, OnInit} from '@angular/core';
import {GoogleBooksService} from '../shared/google-books.service';
import {Book} from '../shared/book';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private term = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private googleBooksService: GoogleBooksService) {
    this.route.paramMap.subscribe(p => {
      if (p.has('term')) {
        this.term = p.get('term');
        this.onSearch(this.term);
      }
    });
  }

  doSearch() {
    this.router.navigate(['search', {term: this.term}]);
  }

  onSearch(term: string) {
    this.googleBooksService.searchBooks(term);
  }

  ngOnInit() {
  }

}
