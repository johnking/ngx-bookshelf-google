import { BookshelfPage } from './app.po';
import { browser, protractor} from 'protractor';

describe('ngx-bookshelf-google App', () => {
  let page: BookshelfPage;

  beforeEach(() => {
    page = new BookshelfPage();
    page.navigateToHome();
  });

  it(`should display heading saying 'app'`, () => {
    expect(page.getHeading()).toEqual('app');
  });

  it(`should display a list of links`, () => {
    expect(page.getAllLinkElements().count()).toBe(3);
  });

  it(`should find a 'BookShelf' link`, () => {
    expect(page.findElementWithLinkText('BookShelf').getTagName()).toBe('a');
  });

  it(`should find a 'Search' link`, () => {
    expect(page.findElementWithLinkText('Search').getTagName()).toBe('a');
  });

  it(`should find a 'Library' link`, () => {
    expect(page.findElementWithLinkText('Library').getTagName()).toBe('a');
  });

  it(`should be able to navigate to 'search' page`, () => {
    page.navigateToSearch();
    browser.sleep(2000);
    page.navigateToLibrary();
    browser.sleep(2000);
  });
});
