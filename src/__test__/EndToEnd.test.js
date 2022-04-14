import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(100000);
    // browser = await puppeteer.launch();
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
  }, 100000);
  test('User can expand an event to see its details', async () => {
    await page.click('.show-button');
    const eventDetails = await page.$('.details-modal');
    expect(eventDetails).toBeDefined();
  }, 100000);
  test('User can collapse an event to hide its details', async () => {
    await page.click('.show-button');
    await page.click('.close-button');
    const eventDetails = await page.$('.details-modal');
    expect(eventDetails).toBeNull();
  }, 100000);
});

describe('filter events by city', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(100000);
    // browser = await puppeteer.launch();
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 250,
      ignoreDefaultArgs: ['--disable-extensions']
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.city');
  })

  afterAll(() => {
    browser.close();
  })

  test('all cities are shown by default when input is empty', async () => {
    const searchInput = await page.$eval('.city', (input) => {
      return input.getAttribute('value')
    });
    expect(searchInput).toBe('');
  }, 100000);

  test('input is changed to Berlin and suggestion is selected', async () => {
    await page.click('.city');
    await page.type('.city', 'Berlin');
    await page.click('.suggestions li');
    const eventLength = await page.$$eval('.event-card', (element) => element.length);
    expect(eventLength).toBe(3);
  }, 100000);
});