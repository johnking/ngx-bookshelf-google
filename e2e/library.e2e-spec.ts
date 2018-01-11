import { browser, protractor, ElementFinder} from 'protractor';
import { LibraryPage } from './library.po';

fdescribe('LibraryPage', () => {
  const page = new LibraryPage();

  beforeEach(() => {
    page.navigateToLibrary();
  });

  it(`should have a header`, () => {
    expect(page.getHeading()).toContain( 'Library');
    browser.sleep(2000);
  });

  it(`should have an app-book-list`, () => {
    expect(page.getAppbooklistElement()).toBeTruthy();
  });

});
