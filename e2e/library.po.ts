import { browser, element, by, Key, ElementFinder, ElementArrayFinder, promise, $, $$ } from 'protractor';

export class LibraryPage {

  navigateToLibrary(): promise.Promise<any> {
    return browser.get('/library');
  }

  getHeading(): promise.Promise<string> {
    return $('.page-header h4').getText();
  }

  getAppbooklistElement(): ElementFinder {
    return $('app-book-list');
  }
}
