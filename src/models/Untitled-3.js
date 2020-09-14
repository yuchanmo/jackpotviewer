// var client = require('cheerio-httpcli')
// var url = 'https://finance.naver.com/item/sise.nhn?code=108860'
// client.fetch(url,(e,$,r)=>{
//     if(e){
//         console.log(e)
//         return
//     }
//     var l = $.html()
//     console.log(l)
//     $('title').each(v=>{
//         console.log($(this).text())       
//     })

// console.log('agb'.replace('a','c'))
// let code = 'agag'
// let config = {
//     'headers':{
//     'Host': 'finance.daum.net',
//     'Connection': 'keep-alive',
//     'Accept': 'application/json, text/javascript, */*; q=0.01',
//     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',
//     'X-Requested-With': 'XMLHttpRequest',
//     'Referer': 'http://finance.daum.net/quotes/{code}',
//     'Accept-Encoding': 'gzip, deflate',
//     'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
//     'Cookie': '_TI_NID=iok9mjEFfnWoNqMjDA5hhUz8RnRoFJmjeMkjFvT7JYdrJYTW75KEha6AtdEFb1tIzandH1pdBhNpEJoajFst7Q==; _ga=GA1.2.907775595.1596724382; TIARA=j-.4biJBif8iTA-D3br7PdEqu.-iImySPYK2iZOTmVzZtPY6.hwGGn-j3PjgnmIjCGOhXEKBUc4-.diNQRp2.ONfuNRnHmU5; __T_=1; _gid=GA1.2.290652475.1599149917; _gat_gtag_UA_128578811_1=1; sf_ck_tst=test; _dfs=WHkzTUU4ODdtUkMrWlQyQUVQNmlwZnNHZjdHTHhhRWZiR1F5bmZMS0lRbGpTRi9DazFuODY1Vm9HREo0THFYeUs3NWhSQUtMZ05oSWJwdkFNMWJHZEE9PS0tK0pMbWpGRHdPVE03bEt0UDBsaU1sZz09--fb2bc9acb4273c56247aafba4259042ddf2bcd4f; KAKAO_STOCK_RECENT=[%22A004840%22%2C%22A005930%22%2C%22A144620%22]'
//     }
// }
// let t = config['headers']['Referer']
// config['headers']['Referer'] = t.replace('{code}',code)

var today = new Date()
console.log(today)
var d = new Date('2020-09-08')
console.log(d)
let diff = today.getTime() - d.getTime() 
const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24)); 

console.log(diffDays)


// console.log(Math.random()*10)
var req = new XMLHttpRequest();
req.open('GET', document.location, false);
req.send(null);
var headers = req.getAllResponseHeaders().toLowerCase();
alert(headers);

let h = null
var request = require('request')
request.get('http://finance.daum.net/quotes/A004840', function(err, res, body) {   
   console.log(res.headers)  
   h = res.headers
  });


// let config = {
// 'headers':{
// 'Host': 'finance.daum.net',
// 'Connection': 'keep-alive',
// 'Accept': 'application/json, text/javascript, */*; q=0.01',
// 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',
// 'X-Requested-With': 'XMLHttpRequest',
// 'Referer': 'http://finance.daum.net/quotes/A004840',
// 'Accept-Encoding': 'gzip, deflate',
// 'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
// 'Cookie': '_TI_NID=iok9mjEFfnWoNqMjDA5hhUz8RnRoFJmjeMkjFvT7JYdrJYTW75KEha6AtdEFb1tIzandH1pdBhNpEJoajFst7Q==; _ga=GA1.2.907775595.1596724382; TIARA=j-.4biJBif8iTA-D3br7PdEqu.-iImySPYK2iZOTmVzZtPY6.hwGGn-j3PjgnmIjCGOhXEKBUc4-.diNQRp2.ONfuNRnHmU5; __T_=1; _gid=GA1.2.290652475.1599149917; _gat_gtag_UA_128578811_1=1; sf_ck_tst=test; _dfs=WHkzTUU4ODdtUkMrWlQyQUVQNmlwZnNHZjdHTHhhRWZiR1F5bmZMS0lRbGpTRi9DazFuODY1Vm9HREo0THFYeUs3NWhSQUtMZ05oSWJwdkFNMWJHZEE9PS0tK0pMbWpGRHdPVE03bEt0UDBsaU1sZz09--fb2bc9acb4273c56247aafba4259042ddf2bcd4f; KAKAO_STOCK_RECENT=[%22A004840%22%2C%22A005930%22%2C%22A144620%22]'
// }
// }

let config = {
'headers':{
'Host': 'finance.daum.net',
'Connection': 'keep-alive',
'Accept': 'application/json, text/javascript, */*; q=0.01',
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',
'X-Requested-With': 'XMLHttpRequest',
'Referer': 'http://finance.daum.net/quotes/A004840',
'Accept-Encoding': 'gzip, deflate',
'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
}
}

let axios = require('axios')

axios.get('https://krxapi.azurewebsites.net/stock/108860').then(v=>{
  


})



axios.get('http://finance.daum.net/api/quote/A004840/sectors',config).then(v=>{
let d = v.data
console.log(d)
console.log(d['data'][0]['tradePrice'])
}
)

var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var c = require('cheerio')
import krx from 'krx-stock-api'; 
krx.getStock('035420').then(v=>console.log(v.price))


let url ='http://asp1.krx.co.kr/servlet/krx.asp.XMLSise?code={code}'
            url = url.replace('{code}',this.Code)
            console.log(url)
            axios.get(url).then(v=>{
                console.log(v.data)
                var $ = c.load(v.data)
                var t = $('TBL_StockInfo').eq(0)[0]['attribs']
                this.CurrentValue = parseInt(t['curjuka'])
                this.CurrentVolume = parseInt(t['volume'])
            }).catch(e=>console.log(e.status))


axios.get('https://finance.naver.com/item/sise.nhn?codse=03542').then(v=>{
    console.log(v.data)   

}).catch(e=>console.log(e))


})