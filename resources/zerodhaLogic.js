module.exports = { 
    
    calculateQuantity : function  (risk, buy_trigger, stop_loss_trigger) {

        let diff = buy_trigger - stop_loss_trigger;
        let quantity = risk / diff;
        quantity = Math.floor(quantity);
        return quantity;
      
    },

    
    calculateBuyPrice : function  ( buy_trigger ) {
    
        let buyPrice = buy_trigger + 0.2;
        buyPrice = buyPrice.toFixed(2);
        return buyPrice;
        
    },
    
    calculateTarget1 : function  ( buy_trigger, stop_loss_trigger ) {
        
        let diff = buy_trigger - stop_loss_trigger ;
        let target1 = buy_trigger + diff ;
        target1 = target1.toFixed(2);
        return target1;
        
    },
    
    calculateTarget2 : function  ( buy_trigger, stop_loss_trigger ) {
        
        let diff = buy_trigger - stop_loss_trigger ;
        let target2 = buy_trigger + 2*diff ;
        target2 = target2.toFixed(2);
        return target2;
        
    },
    
    calculateTarget3 : function  ( buy_trigger, stop_loss_trigger ) {
        
        let diff = buy_trigger - stop_loss_trigger ;
        let target3 = buy_trigger + 3*diff ;
        target3 = target3.toFixed(2);
        return target3;
        
    }

}