import { KymppitonniPage } from './app.po';

describe('kymppitonni App', () => {
  let page: KymppitonniPage;

  beforeEach(() => {
    page = new KymppitonniPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
