import { browser, element, by, Key, ElementFinder, ElementArrayFinder, promise } from 'protractor';

export class BookshelfPage {

  navigateToHome(): promise.Promise<any> {
    return browser.get('/');
  }

  navigateToSearch(): promise.Promise<any> {
    return browser.get('/search');
  }

  navigateToLibrary(): promise.Promise<any> {
    return browser.get('/library');
  }

  getHeading(): promise.Promise<string> {
    return element(by.css('app-root h1')).getText();
  }

  getAllLinkElements(): ElementArrayFinder {
    return element.all(by.css('a'));
  }

  findElementWithLinkText(text: string): ElementFinder {
    return element(by.linkText(text));
  }

}
