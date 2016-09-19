import { B4aPage } from './app.po';

describe('b4a App', function() {
  let page: B4aPage;

  beforeEach(() => {
    page = new B4aPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
