const puppeteer = require('puppeteer');
require('dotenv').config();

(async () => {
  const browser = await puppeteer.launch({ headless: false , args: ["--disable-notifications"]});
  const page = await browser.newPage();

  const userId = process.env.userId;
  const password = process.env.password;

  // await page.goto('https://kite.zerodha.com/holdings');
  await page.goto('https://kite.zerodha.com/');
  //await page.setViewport({ width: 1200, height: 800 })
  await page.setViewport({ width: 1366, height: 625 })
  // login user
  await page.type('#userid', userId);
  await page.type('#password', password);
  
  await page.waitForSelector('.row > .login-form > form > .actions > .button-orange')
  await page.click('.row > .login-form > form > .actions > .button-orange')

  // Enter Authentication OTP
  await page.waitForSelector('#totp')
  await page.type('#totp', '524495')

  await page.waitForSelector('.row > .login-form > .twofa-form > .actions > .button-orange')
  await page.click('.row > .login-form > .twofa-form > .actions > .button-orange')


  // search the Ticker Name
  await page.waitForSelector('.marketwatch-sidebar > .omnisearch > .search > .su-input-group > input')
  await page.type('.marketwatch-sidebar > .omnisearch > .search > .su-input-group > input', 'fsl');

  // await page.click('.marketwatch-sidebar > .omnisearch > .search > .su-input-group > input', 'SBIN')

  await page.waitForSelector('.omnisearch-results > div > .search-result-item')
  await page.click('.omnisearch-results > div > .search-result-item')

  /* Future Uses
  await page.waitForSelector('.omnisearch-results > div > .search-result-item > .action-buttons > .button-blue')
  await page.click('.omnisearch-results > div > .search-result-item > .action-buttons > .button-blue')
  
  */


  // dialog box opens Now choose the options Below

  // 1. Intraday
  await page.waitForSelector('.body > .product > .su-radio-group > .type:nth-child(1) > .su-radio-label')
  await page.click('.body > .product > .su-radio-group > .type:nth-child(1) > .su-radio-label')


  // 2. Quantity
  await page.waitForSelector('.fields > .row > .quantity > .no > input')
  await page.type('.fields > .row > .quantity > .no > input', '639')

  // 3. Price
  await page.waitForSelector('.fields > .row > .price > .no > input')
  await page.click({ clickCount: 3 })
  await page.type('.fields > .row > .price > .no > input', '400')

  //await page.screenshot({ path: 'sc.png', fullPage: true });
  //await browser.close();
})();