import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {

  test('An event element is collapse by default', async () => {
    jest.setTimeout(30000);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event-card');
    const eventDetails = await page.$('.modal');
    expect(eventDetails).toBeNull();
    browser.close();
  });
  test('User can expand an event to see its details', async () => {
    jest.setTimeout(30000);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event-card');
    await page.click('.show-button');
    const eventDetails = await page.$('.modal');
    expect(eventDetails).toBeDefined();
    browser.close();
  });
});