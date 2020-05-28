import { TestOnePage } from './app.po';

describe('test-one App', () => {
  let page: TestOnePage;

  beforeEach(() => {
    page = new TestOnePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
