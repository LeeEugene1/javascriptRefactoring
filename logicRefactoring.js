
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

//관객의 규모로 가격 측정
//별개로 포인트 지급
function statement(invoice, plays){
    let totalAmount = 0
    let volumeCredits = 0
    let result = `청구 내역(고객명:${invoice[0].customer})\n`
    console.log(invoice)
    const format = new Intl.NumberFormat("en-US",{
        style:"currency", currency:"USD",
        minimumFractionDigits:2
    }).format
    
    for(let aPerformanceof invoice[0].performances){//perf는 배열속 객체
        const play = plays[aPerformance.playID]
        console.log(`${aPerformance}, ${aPerformance.playID}`)
        let thisAmount = amountFor(aPerformance, play)

        //포인트를 적립
        volumeCredits += Math.max(aPerformance.audience - 30, 0)
        //희극 관객 5명마다 추가 포인트 제공
        if("comedy" === play.type) volumeCredits += Math.floor(aPerformance.audience / 5)
        //청구내역출력
        result += `${play.name}: ${format(thisAmount/100)}(${aPerformance.audience}석)\n`
        totalAmount += thisAmount

    }
    result += `총액 ${format(totalAmount/100)}\n`
    result += `적립 포인트: ${volumeCredits}점\n`
    return console.log(result)
}

function amountFor(aPerformance, play){//값이 바뀌지않는 변수는 매개변수로 전달
    let result = 0;//1. 명확한 함수사용

    switch (play.type){
        case "tragedy":
            result = 40000
            if(aPerformance.audience > 30){
                result += 1000 * (aPerformance.audience - 30)
            }
            break
        case "comedy":
            result = 30000
            if(aPerformance.audience > 20){
                result += 10000 + 500 * (aPerformance.audience - 20)
            }
            result += 300 * aPerformance.audience
            break
        default:
            throw new Error(`알수 없는 장르: ${plays.type}`)
    }

    return result
}

statement(invoice, plays)
// console.log(result)