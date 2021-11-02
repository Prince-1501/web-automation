const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');

require('dotenv').config();
const zerodhaFunctions = require('./resources/zerodhaLogic');

const userId = process.env.userId;
const password = process.env.password;


let input_price, input_trigger, input_quantity;
var port = process.env.PORT || 5010;

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get('/',(req,res)=>{
  
  res.send('Zerodha Login');
  console.log('Zerodha Login');

});

app.post('/order', (req,res)=>{

  const data = req.body;

  let totp = data.totp;
  totp = totp.toString();

  let ticker = data.ticker;
  ticker = ticker.toUpperCase();

  let risk = data.risk;
  let buy_trigger = data.buy_trigger;
  let stop_loss_trigger = data.stop_loss_trigger;


  // calculate
  let quantity = zerodhaFunctions.calculateQuantity(risk, buy_trigger, stop_loss_trigger );
  let buy_price = zerodhaFunctions.calculateBuyPrice(buy_trigger);
  let target1 = zerodhaFunctions.calculateTarget1( buy_trigger, stop_loss_trigger );
  let target2 = zerodhaFunctions.calculateTarget2( buy_trigger, stop_loss_trigger );
  let target3 = zerodhaFunctions.calculateTarget3( buy_trigger, stop_loss_trigger );


  // convert integer to string
  buy_trigger = buy_trigger.toString();
  stop_loss_trigger = stop_loss_trigger.toString();
  buy_price = buy_price.toString();
  quantity = quantity.toString();
  target1 = target1.toString();
  target2 = target2.toString();
  target3 = target3.toString();


  // console.console.log();
  console.log('--------------------------------------------------------');
  console.log(`totp : ${totp}`);
  console.log(`ticker : ${ticker}`);
  console.log(`risk : ${risk}`);
  console.log(`buy_trigger : ${buy_trigger}`);
  console.log(`stop_loss_trigger : ${stop_loss_trigger}`);
  console.log(`quantity : ${quantity}`);
  console.log(`buy_price : ${buy_price}`);
  console.log(`target1 : ${target1}`);
  console.log(`target2 : ${target2}`);
  console.log(`target3 : ${target3}`);




  // < ------------------------------------ CALL MAIN FUNCTION ------------------------------------ >


  (async () => {
  
    const width = 1366; const height = 625;

    const browser = await puppeteer.launch({ 
      headless: false , 
      defaultViewport: { 'width' : width, 'height' : height },
      args: ["--disable-notifications"]
    });
    
    const page = await browser.newPage();
  
    // open Website
    await page.goto('https://kite.zerodha.com/');
  
    
    // login user
    await page.type('#userid', userId);
    await page.type('#password', password);
    
    await page.waitForSelector('.row > .login-form > form > .actions > .button-orange');
    await page.click('.row > .login-form > form > .actions > .button-orange');
  
  
    // Enter Authentication OTP
    await page.waitForSelector('#totp');
    await page.type('#totp', totp);
  
    await page.waitForSelector('.row > .login-form > .twofa-form > .actions > .button-orange');
    await page.click('.row > .login-form > .twofa-form > .actions > .button-orange');
  
  


  
  
   // CASE : <--------------------------- BUY STOCK -------------------- >
  
    
    // search the Ticker Name
    await page.waitForSelector('.marketwatch-sidebar > .omnisearch > .search > .su-input-group > input');
    await page.type('.marketwatch-sidebar > .omnisearch > .search > .su-input-group > input', ticker);
  

    // click on Buy Option
    await page.waitForSelector('.omnisearch-results > div > .search-result-item');
    await page.click('.omnisearch-results > div > .search-result-item');
  
    

    /* Future Uses
    await page.waitForSelector('.omnisearch-results > div > .search-result-item > .action-buttons > .button-blue');
    await page.click('.omnisearch-results > div > .search-result-item > .action-buttons > .button-blue');
    */
  
  
    // dialog box opens Now choose the options Below
  
  
    // 1. Intraday
    await page.waitForSelector('.body > .product > .su-radio-group > .type:nth-child(1) > .su-radio-label');
    await page.click('.body > .product > .su-radio-group > .type:nth-child(1) > .su-radio-label');
  
  
  
    // 2. Quantity
    input_quantity = await page.waitForSelector('.fields > .row > .quantity > .no > input');
    await input_quantity.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type('.fields > .row > .quantity > .no > input', quantity);
  
  
    // 3. Price - First set it to Blank then set the Price
    input_price = await page.waitForSelector('.fields > .row > .price > .no > input');
    await input_price.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type('.fields > .row > .price > .no > input', buy_price);
  
  
    // For SL Order
    await page.waitForSelector('.row > .trigger > .su-radio-group > .su-radio-wrap:nth-child(1) > .su-radio-label');
    await page.click('.row > .trigger > .su-radio-group > .su-radio-wrap:nth-child(1) > .su-radio-label');
  
  
    input_trigger = await page.waitForSelector('.fields > .row > .trigger > .no > input');
    await input_trigger.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type('.fields > .row > .trigger > .no > input', buy_trigger);


    // 4. Buy button
    await page.waitForSelector('.footer > .row > .six > .submit > span');
    await page.click('.footer > .row > .six > .submit > span');
  





    
    // CASE : <--------------------------- SELL STOCK  100 % sold Part 1 -------------------- >
  
    


    // search the Ticker Name
    await page.waitForSelector('.marketwatch-sidebar > .omnisearch > .search > .su-input-group > input');
    await page.type('.marketwatch-sidebar > .omnisearch > .search > .su-input-group > input', ticker);
  

    // click on Buy Option
    await page.waitForSelector('.omnisearch-results > div > .search-result-item');
    await page.click('.omnisearch-results > div > .search-result-item');
  
  
    // Switch to SELL Order
    await page.waitForSelector('.wrap-right > div > span > .su-switch-group > .su-switch-control');
    await page.click('.wrap-right > div > span > .su-switch-group > .su-switch-control');
  
  
    // 1. Intraday
    await page.waitForSelector('.body > .product > .su-radio-group > .type:nth-child(1) > .su-radio-label');
    await page.click('.body > .product > .su-radio-group > .type:nth-child(1) > .su-radio-label');
  
  
  
    // 2. Quantity
    input_quantity = await page.waitForSelector('.fields > .row > .quantity > .no > input');
    await input_quantity.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type('.fields > .row > .quantity > .no > input', quantity);
      

    // For SL-M Order
    await page.waitForSelector('.row > .trigger > .su-radio-group > .su-radio-wrap:nth-child(2) > .su-radio-label');
    await page.click('.row > .trigger > .su-radio-group > .su-radio-wrap:nth-child(2) > .su-radio-label');
    
  
    input_trigger = await page.waitForSelector('.fields > .row > .trigger > .no > input');
    await input_trigger.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type('.fields > .row > .trigger > .no > input', stop_loss_trigger);
  
    

    // 4. Buy button
    await page.waitForSelector('.footer > .row > .six > .submit > span');
    await page.click('.footer > .row > .six > .submit > span');
  
    
  
  



    // CASE : <--------------------------- TARGET STOCK  100 % sell Part 1 -------------------- >
  

    
    // search the Ticker Name
    await page.waitForSelector('.marketwatch-sidebar > .omnisearch > .search > .su-input-group > input');
    await page.type('.marketwatch-sidebar > .omnisearch > .search > .su-input-group > input', ticker);
  

    // click on Buy Option
    await page.waitForSelector('.omnisearch-results > div > .search-result-item');
    await page.click('.omnisearch-results > div > .search-result-item');
  
    
    // Switch to SELL Order
    await page.waitForSelector('.wrap-right > div > span > .su-switch-group > .su-switch-control');
    await page.click('.wrap-right > div > span > .su-switch-group > .su-switch-control');

  
    // 1. Intraday
    await page.waitForSelector('.body > .product > .su-radio-group > .type:nth-child(1) > .su-radio-label');
    await page.click('.body > .product > .su-radio-group > .type:nth-child(1) > .su-radio-label');
  
  
    // 2. Quantity
    await page.waitForSelector('.fields > .row > .quantity > .no > input');
    await page.type('.fields > .row > .quantity > .no > input', quantity);
  
  
    // 3. Price - First set it to Blank then set the Target Price
    input_price = await page.waitForSelector('.fields > .row > .price > .no > input');
    await input_price.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type('.fields > .row > .price > .no > input', target1);
  
  
    // For Limit Order
    await page.waitForSelector('.row > .price > .su-radio-group > .su-radio-wrap:nth-child(2) > .su-radio-label');
    await page.click('.row > .price > .su-radio-group > .su-radio-wrap:nth-child(2) > .su-radio-label');
    
    

    // 4. Buy button
    await page.waitForSelector('.footer > .row > .six > .submit > span');
    await page.click('.footer > .row > .six > .submit > span');


    
    //await page.screenshot({ path: 'sc.png', fullPage: true });
    await browser.close();
    
    res.send(`Order Placed Successfully on ${ticker}`);

  })();

});



app.listen(port,()=>{
  console.log(`server is up on port ${port}`);
});