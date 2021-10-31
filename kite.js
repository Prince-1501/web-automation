const puppeteer = require('puppeteer');
require('dotenv').config();

const userId = process.env.userId;
const password = process.env.password;


let input_price, input_trigger;

module.exports = { ZerodhaFun : (async (totp) => {
  
  const browser = await puppeteer.launch({ 
    headless: false , 
    defaultViewport: null,
    args: ["--disable-notifications"]
  });
  
  const page = await browser.newPage();

  // open Website
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
  await page.type('#totp', totp)

  await page.waitForSelector('.row > .login-form > .twofa-form > .actions > .button-orange')
  await page.click('.row > .login-form > .twofa-form > .actions > .button-orange')




 // CASE : <--------------------------- BUY STOCK -------------------- >


  // search the Ticker Name
  await page.waitForSelector('.marketwatch-sidebar > .omnisearch > .search > .su-input-group > input')
  await page.type('.marketwatch-sidebar > .omnisearch > .search > .su-input-group > input', ticker);


  // click on Buy Option
  await page.waitForSelector('.omnisearch-results > div > .search-result-item')
  await page.click('.omnisearch-results > div > .search-result-item')


  /* Future Uses
  await page.waitForSelector('.omnisearch-results > div > .search-result-item > .action-buttons > .button-blue')
  await page.click('.omnisearch-results > div > .search-result-item > .action-buttons > .button-blue')
  */


  // dialog box opens Now choose the options Below


  // Switch to SELL Order
  // await page.waitForSelector('.wrap-right > div > span > .su-switch-group > .su-switch-control')
  // await page.click('.wrap-right > div > span > .su-switch-group > .su-switch-control')


  // 1. Intraday
  await page.waitForSelector('.body > .product > .su-radio-group > .type:nth-child(1) > .su-radio-label')
  await page.click('.body > .product > .su-radio-group > .type:nth-child(1) > .su-radio-label')



  // 2. Quantity
  await page.waitForSelector('.fields > .row > .quantity > .no > input')
  await page.type('.fields > .row > .quantity > .no > input', quantity)


  // 3. Price - First set it to Blank then set the Price
  input_price = await page.waitForSelector('.fields > .row > .price > .no > input')
  await input_price.click({ clickCount: 3 })
  await page.keyboard.press('Backspace')
  await page.type('.fields > .row > .price > .no > input', '400')



  // For Limit Order
  // await page.waitForSelector('.row > .price > .su-radio-group > .su-radio-wrap:nth-child(2) > .su-radio-label')
  // await page.click('.row > .price > .su-radio-group > .su-radio-wrap:nth-child(2) > .su-radio-label')


  // For SL Order
  await page.waitForSelector('.row > .trigger > .su-radio-group > .su-radio-wrap:nth-child(1) > .su-radio-label')
  await page.click('.row > .trigger > .su-radio-group > .su-radio-wrap:nth-child(1) > .su-radio-label')


  input_trigger = await page.waitForSelector('.fields > .row > .trigger > .no > input')
  await input_trigger.click({ clickCount: 3 })
  await page.keyboard.press('Backspace')
  await page.type('.fields > .row > .trigger > .no > input', '200')

  // 4. Buy button
  await page.waitForSelector('.footer > .row > .six > .submit > span')
  await page.click('.footer > .row > .six > .submit > span')




  // CASE : <--------------------------- SELL STOCK  50 % sold Part 1 -------------------- >


  
  // search the Ticker Name
  await page.waitForSelector('.marketwatch-sidebar > .omnisearch > .search > .su-input-group > input')
  await page.type('.marketwatch-sidebar > .omnisearch > .search > .su-input-group > input', ticker);


  // click on Buy Option
  await page.waitForSelector('.omnisearch-results > div > .search-result-item')
  await page.click('.omnisearch-results > div > .search-result-item')


  /* Future Uses
  await page.waitForSelector('.omnisearch-results > div > .search-result-item > .action-buttons > .button-blue')
  await page.click('.omnisearch-results > div > .search-result-item > .action-buttons > .button-blue')
  */


  // dialog box opens Now choose the options Below


  // Switch to SELL Order
  await page.waitForSelector('.wrap-right > div > span > .su-switch-group > .su-switch-control')
  await page.click('.wrap-right > div > span > .su-switch-group > .su-switch-control')


  // 1. Intraday
  await page.waitForSelector('.body > .product > .su-radio-group > .type:nth-child(1) > .su-radio-label')
  await page.click('.body > .product > .su-radio-group > .type:nth-child(1) > .su-radio-label')



  // 2. Quantity
  await page.waitForSelector('.fields > .row > .quantity > .no > input')
  await page.type('.fields > .row > .quantity > .no > input', quantity)


  // 3. Price - First set it to Blank then set the Price
  input_price = await page.waitForSelector('.fields > .row > .price > .no > input')
  await input_price.click({ clickCount: 3 })
  await page.keyboard.press('Backspace')
  await page.type('.fields > .row > .price > .no > input', '400')



  // For Limit Order
  // await page.waitForSelector('.row > .price > .su-radio-group > .su-radio-wrap:nth-child(2) > .su-radio-label')
  // await page.click('.row > .price > .su-radio-group > .su-radio-wrap:nth-child(2) > .su-radio-label')


  // For SL Order
  await page.waitForSelector('.row > .trigger > .su-radio-group > .su-radio-wrap:nth-child(1) > .su-radio-label')
  await page.click('.row > .trigger > .su-radio-group > .su-radio-wrap:nth-child(1) > .su-radio-label')


  input_trigger = await page.waitForSelector('.fields > .row > .trigger > .no > input')
  await input_trigger.click({ clickCount: 3 })
  await page.keyboard.press('Backspace')
  await page.type('.fields > .row > .trigger > .no > input', '400.25')

  // 4. Buy button
  await page.waitForSelector('.footer > .row > .six > .submit > span')
  await page.click('.footer > .row > .six > .submit > span')




  // CASE : <--------------------------- SELL STOCK  50 % sold Part 2 -------------------- >

  
  // search the Ticker Name
  await page.waitForSelector('.marketwatch-sidebar > .omnisearch > .search > .su-input-group > input')
  await page.type('.marketwatch-sidebar > .omnisearch > .search > .su-input-group > input', ticker);


  // click on Buy Option
  await page.waitForSelector('.omnisearch-results > div > .search-result-item')
  await page.click('.omnisearch-results > div > .search-result-item')


  /* Future Uses
  await page.waitForSelector('.omnisearch-results > div > .search-result-item > .action-buttons > .button-blue')
  await page.click('.omnisearch-results > div > .search-result-item > .action-buttons > .button-blue')
  */


  // dialog box opens Now choose the options Below


  // Switch to SELL Order
  // await page.waitForSelector('.wrap-right > div > span > .su-switch-group > .su-switch-control')
  // await page.click('.wrap-right > div > span > .su-switch-group > .su-switch-control')


  // 1. Intraday
  await page.waitForSelector('.body > .product > .su-radio-group > .type:nth-child(1) > .su-radio-label')
  await page.click('.body > .product > .su-radio-group > .type:nth-child(1) > .su-radio-label')



  // 2. Quantity
  await page.waitForSelector('.fields > .row > .quantity > .no > input')
  await page.type('.fields > .row > .quantity > .no > input', quantity)


  // 3. Price - First set it to Blank then set the Price
  input_price = await page.waitForSelector('.fields > .row > .price > .no > input')
  await input_price.click({ clickCount: 3 })
  await page.keyboard.press('Backspace')
  await page.type('.fields > .row > .price > .no > input', '400')



  // For Limit Order
  // await page.waitForSelector('.row > .price > .su-radio-group > .su-radio-wrap:nth-child(2) > .su-radio-label')
  // await page.click('.row > .price > .su-radio-group > .su-radio-wrap:nth-child(2) > .su-radio-label')


  // For SL Order
  await page.waitForSelector('.row > .trigger > .su-radio-group > .su-radio-wrap:nth-child(1) > .su-radio-label')
  await page.click('.row > .trigger > .su-radio-group > .su-radio-wrap:nth-child(1) > .su-radio-label')


  input_trigger = await page.waitForSelector('.fields > .row > .trigger > .no > input')
  await input_trigger.click({ clickCount: 3 })
  await page.keyboard.press('Backspace')
  await page.type('.fields > .row > .trigger > .no > input', '400.25')

  // 4. Buy button
  await page.waitForSelector('.footer > .row > .six > .submit > span')
  await page.click('.footer > .row > .six > .submit > span')

  //await page.screenshot({ path: 'sc.png', fullPage: true });
  await browser.close();
  
  res.send(`Order Placed Successfully on ${ticker}`);

  
})()

};