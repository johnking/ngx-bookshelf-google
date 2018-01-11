import { browser, protractor, ElementFinder} from 'protractor';
import { SearchPage } from './search.po';

describe('SearchPage', () => {
  let page: SearchPage;

  beforeEach(() => {
    page = new SearchPage();
    page.navigateToSearch();
  });

  it(`should have a search input`, () => {
    expect(page.getSearchElement()).toBeTruthy();
  });

  it(`should have a search button`, () => {
    expect(page.getSearchButton()).toBeTruthy();
  });

  it(`Seach input should be able to accept input string`, () => {
    const se = page.getSearchElement();
    se.clear();
    // browser.sleep(1000);
    se.sendKeys('term');

    expect(page.getSearchString()).toContain('term');
    // browser.sleep(2000);
  });

  it(`should have a display area for search status`, () => {
    expect(page.getSearchStatusElement()).toBeTruthy();
  });

  it(`should have an app-book-list`, () => {
    expect(page.getAppbooklistElement()).toBeTruthy();
  });

  it(`should have an app-pager`, () => {
    expect(page.getApppagerElement()).toBeTruthy();
  });

  it(`should display search result`, () => {
    const se = page.getSearchElement();
    se.clear();
    se.sendKeys('angular');
    page.getSearchButton().click();
    // browser.sleep(1000);

    expect(page.getSearchStatusResult()).not.toContain('Loading...');
    browser.sleep(2000);
  });

});
