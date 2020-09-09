import axios from 'axios'

export function getCurrentPrice(code){      
    
    let config = {
        'headers':{
        'Host': 'finance.daum.net',
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': 'http://finance.daum.net/quotes/{code}',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cookie': '_TI_NID=iok9mjEFfnWoNqMjDA5hhUz8RnRoFJmjeMkjFvT7JYdrJYTW75KEha6AtdEFb1tIzandH1pdBhNpEJoajFst7Q==; _ga=GA1.2.907775595.1596724382; TIARA=j-.4biJBif8iTA-D3br7PdEqu.-iImySPYK2iZOTmVzZtPY6.hwGGn-j3PjgnmIjCGOhXEKBUc4-.diNQRp2.ONfuNRnHmU5; __T_=1; _gid=GA1.2.290652475.1599149917; _gat_gtag_UA_128578811_1=1; sf_ck_tst=test; _dfs=WHkzTUU4ODdtUkMrWlQyQUVQNmlwZnNHZjdHTHhhRWZiR1F5bmZMS0lRbGpTRi9DazFuODY1Vm9HREo0THFYeUs3NWhSQUtMZ05oSWJwdkFNMWJHZEE9PS0tK0pMbWpGRHdPVE03bEt0UDBsaU1sZz09--fb2bc9acb4273c56247aafba4259042ddf2bcd4f; KAKAO_STOCK_RECENT=[%22A004840%22%2C%22A005930%22%2C%22A144620%22]'
        }
    }  

    let url = 'http://finance.daum.net/api/quote/{code}/sectors'
    let t = config['headers']['Referer']    
    config['headers']['Referer'] = t.replace('{code}',code)
    url = url.replace('{code}',code)

    let currentval = 0    
    axios.get(url,config).then(v=>{
    let d = v.data    
    currentval = d['data'][0]['tradePrice']
    })
return currentval
}

