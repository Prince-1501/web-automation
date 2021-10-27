const puppeteer = require('puppeteer');
require('dotenv').config();


(async () => {
  const browser = await puppeteer.launch({ headless: false , args: ["--disable-notifications"]});
  const page = await browser.newPage();

  const userId = process.env.userId;
  const password = process.env.password;

  // await page.goto('https://kite.zerodha.com/holdings');
  await page.goto('https://kite.zerodha.com/');
  await page.setViewport({ width: 1920, height: 1080 })

  // login user
  await page.type('#userid', userId);
  await page.type('#password', password);
  
  await page.waitForSelector('.row > .login-form > form > .actions > .button-orange')
  await page.click('.row > .login-form > form > .actions > .button-orange')

  // Enter Authentication OTP
  await page.waitForSelector('#totp')
  await page.type('#totp', '864749')

  await page.waitForSelector('.row > .login-form > .twofa-form > .actions > .button-orange')
  await page.click('.row > .login-form > .twofa-form > .actions > .button-orange')

  await page.waitForSelector('.marketwatch-sidebar > .omnisearch > .search > .su-input-group > input')
  await page.type('.marketwatch-sidebar > .omnisearch > .search > .su-input-group > input', 'SBIN');

  // await page.click('.marketwatch-sidebar > .omnisearch > .search > .su-input-group > input', 'SBIN')

  const imageItems = await page.hover('.marketwatch-sidebar > .omnisearch > .search > .su-input-group > input');
  console.log(imageItems);

  await page.mouse.click(40, 100);

  await page.waitForSelector('.omnisearch-results > div > .search-result-item selected > .action-buttons > .button-blue')
  await page.click('.omnisearch-results > div > .search-result-item selected > .action-buttons > .button-blue')


  //await page.screenshot({ path: 'sc.png', fullPage: true });

  //await browser.close();
})();