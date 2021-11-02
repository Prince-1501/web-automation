

/**
Buy

given -> trigger price 
    price -> trigger + 0.25 


    // trigger price is deadline ->  give breakout for buy and sell so try to take traxaction iside it 

sell -> trigger price
price -> trigger - 0.2


----------------------------------------------------------------

// sell order
stop_loss_trigger  
quantuy
SL-M order


// Traget order 

-> loss_dip = ( buy_trigger - stop_loss_trigger )

50 : 30 : 20
-> traget1 = buy_trigger  + loss_dip
-> traget12 = buy_trigger  + 2 * loss_dip
-> traget13 = buy_trigger  + 3 * loss_dip


// Traget 
-> LIMIT order -> takes only price


--------------------------------------------------------------------------------------------------------------------------------

For Timeout

await page.waitForTimeout(4000);

*/