import { browser, element, by } from 'protractor/globals';

export class B4aPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('b4a-root h1')).getText();
  }
}
