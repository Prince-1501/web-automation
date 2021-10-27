const puppeteer = require('puppeteer');
require('dotenv').config();

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Configure the navigation timeout
  await page.setDefaultNavigationTimeout(0);

  const userIdLeetcode = process.env.userIdLeetcode;
  const password = process.env.password;

  await page.goto('https://leetcode.com/submissions/detail/577526407/');
  await page.type('#id_login', userIdLeetcode);
  await page.type('#id_password', password);
  await page.click('#signin_btn')

  await page.screenshot({ path: 'sc.png', fullPage: true });

  await browser.close();
})();