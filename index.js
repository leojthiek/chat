

function maxProfit(prices){
    let min = prices[0]
    let result = 0
   
    for(let i = 1; i < prices.length; i++){
        let total = prices[i] - min

        if(total > result){
            result = total
        }

        if(prices[i] < min){
            min = prices[i]
        }
    }

    return result
}

const prices = [7,1,5,3,6,4]
console.log(maxProfit(prices))