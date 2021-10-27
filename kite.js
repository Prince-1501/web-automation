const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  require('dotenv').config();

  const userId = process.env.userId;
  const password = process.env.password;

  await page.goto('https://kite.zerodha.com/');
  await page.type('#userid', userId);
  await page.type('#password', password);
  await page.click('#login')

  await page.type('#totp', '328322');
  await page.click('#login')

  //await page.screenshot({ path: 'sc.png', fullPage: true });

  //await browser.close();
})();