
const plays = {
    "hamlet" : {"name":"Hamlet", "type":"tragedy"},
    "as-like" : {"name":"As You Like It", "type":"comedy"},
    "othello" : {"name":"Othello", "type":"tragedy"}
}
const invoice = [{
    "customer" : "yujin",
    "performances" : [
        {
            "playID" : "hamlet",
            "audience" : 55
        },
        {
            "playID" : "as-like",
            "audience" : 35
        },  
        {
            "playID" : "othello",
            "audience" : 40
        }          
    ]
}]


function statement(invoice, plays){
    let totalAmount = 0
    let volumeCredits = 0
    let result = `청구 내역(고객명:${invoice[0].customer})\n`
    console.log(invoice)
    const format = new Intl.NumberFormat("en-US",{
        style:"currency", currency:"USD",
        minimumFractionDigits:2
    }).format
    
    for(let perf of invoice[0].performances){
        const play = plays[perf.playID]
        let thisAmount = 0

        switch (play.type){
            case "tragedy":
                thisAmount = 40000
                if(perf.audience > 30){
                    thisAmount += 1000 * (perf.audience - 30)
                }
                break
            case "comedy":
                thisAmount = 30000
                if(perf.audience > 20){
                    thisAmount += 10000 + 500 * (perf.audience - 20)
                }
                thisAmount += 300 * perf.audience
                break
            default:
                throw new Error(`알수 없는 장르: ${plays.type}`)
        }

        //포인트를 적립
        volumeCredits += Math.max(perf.audience - 30, 0)
        //희극 관객 5명마다 추가 포인트 제공
        if("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5)
        //청구내역출력
        result += `${play.name}: ${format(thisAmount/100)}(${perf.audience}석)\n`
        totalAmount += thisAmount

    }
    result += `총액 ${format(totalAmount/100)}\n`
    result += `적립 포인트: ${volumeCredits}점\n`
    return console.log(result)
}
statement(invoice, plays)
// console.log(result)