import { browser, element, by, Key, ElementFinder, ElementArrayFinder, promise, $, $$ } from 'protractor';

export class SearchPage {

  navigateToSearch(): promise.Promise<any> {
    return browser.get('/search');
  }

  getHeading(): promise.Promise<string> {
    return $('app-root h1').getText();
  }

  getSearchElement(): ElementFinder {
    return $('.form-group input[type=search]');
  }

  getSearchButton(): ElementFinder {
    return $('form button[type=submit]');
  }

  getSearchString(): promise.Promise<string> {
    this.getSearchElement().getAttribute('value');
    return this.getSearchElement().getAttribute('value');
  }

  getSearchStatusElement(): ElementFinder {
    return $('div .search-status');
  }

  getAppbooklistElement(): ElementFinder {
    return $('app-book-list');
  }

  getApppagerElement(): ElementFinder {
    return $('app-pager');
  }

  getSearchStatusResult(): promise.Promise<string> {
    return this.getSearchStatusElement().getText();
  }

  getAllLinkElements(): ElementArrayFinder {
    return $$('a');
  }

  findElementWithLinkText(text: string): ElementFinder {
    return element(by.linkText(text));
  }

}
