import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(50000);
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      ignoreDefaultArgs: ['--disable-extensions']
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event-card');
  })

  afterAll(() => {
    browser.close();
  })

  test('An event element is collapse by default', async () => {
    const eventDetails = await page.$('.details-modal');
    expect(eventDetails).toBeNull();
  });
  test('User can expand an event to see its details', async () => {
    await page.click('.show-button');
    const eventDetails = await page.$('.details-modal');
    expect(eventDetails).toBeDefined();
  });
  test('User can collapse an event to hide its details', async () => {
    await page.click('.show-button');
    await page.click('.close-button');
    const eventDetails = await page.$('.details-modal');
    expect(eventDetails).toBeDefined();
  });
});