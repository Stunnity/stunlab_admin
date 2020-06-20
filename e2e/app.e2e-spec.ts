import { StunlabAdminPage } from './app.po';

describe('stunlab-admin App', () => {
  let page: StunlabAdminPage;

  beforeEach(() => {
    page = new StunlabAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
