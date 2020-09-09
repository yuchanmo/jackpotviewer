// import c from 'cheerio'
import axios from 'axios'
// import krx from 'krx-stock-api'
export class StockValue{
    constructor(v){
        this.Today = new Date()        
        this.KospiKosdaq= v['KospiKosdaq']
        this.Cate = v['Cate']
        this.Name = v['Name']
        this.Code = v['Code']
        this.DaumCode = v['DaumCode']
        this.Url = v['Url']
        this.Date = v['Date']
        this.rank = v['rank']
        this.TradePrice = v['TradePrice']
        this.ClosePrice = v['ClosePrice']
        this.ChangeRage = v['ChangeRate']
        this.TradeVolume = v['TradeVolume']
        this.RegularHoursChangePrice = v['RegularHoursChangePrice']
        this.RegularHoursChangeRate = v['RegularHoursChangeRate']
        this.CurrentValue = 0
        this.CurrentVolume = 0
        this.iterCount = 0
        this.Diff = 0.0
        let timediff = this.Today.getTime() - (new Date(this.Date)).getTime()
        this.DateDiff = (Math.ceil(timediff / (1000 * 60 * 60 * 24))-1).toString()+"일지남"; 
        let url = `https://krxapi.azurewebsites.net/stock/${this.Code}`
        axios.get(url).then(v=>{
            let tmp = v.data                
                this.CurrentValue = tmp['price']
                this.CurrentVolume = tmp['volume']
                this.Diff = this.CurrentValue - this.ClosePrice
        }).catch(e=>console.log(e))
        setInterval(()=>{
            // axios.get('https://krxapi.azurewebsites.net/stock/108860')
            let url = `https://krxapi.azurewebsites.net/stock/${this.Code}`
            // let url = `https://jackpotapi.azurewebsites.net/current?code=${this.Code}`
            axios.get(url).then(v=>{
                let tmp = v.data                
                this.CurrentValue = tmp['price']
                this.CurrentVolume = tmp['volume']
                this.Diff = this.CurrentValue - this.ClosePrice
            }).catch(e=>console.log(e))
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
            //     }
            // }  
        
            // let url = 'http://finance.daum.net/api/quote/{code}/sectors'
            // let t = config['headers']['Referer']    
            // config['headers']['Referer'] = t.replace('{code}',this.DaumCode)
            // url = url.replace('{code}',this.DaumCode)
            // axios.get(url,config).then(v=>{
            // let d = v.data    
            // this.CurrentValue = d['data'][0]['tradePrice']
            // this.Diff = parseFloat(this.CurrentValue) - parseFloat(this.ClosePrice)
            // console.log(this.Name,this.CurrentValue,this.ClosePrice,this.Diff)
            // }).catch(e=>alert(e))
            // let url ='http://asp1.krx.co.kr/servlet/krx.asp.XMLSise?code={code}'
            // url = url.replace('{code}',this.Code)
            // console.log(url)
            // axios.get(url).then(v=>{
            //     console.log(v.data)
            //     var $ = c.load(v.data)
            //     var t = $('TBL_StockInfo').eq(0)[0]['attribs']
            //     this.CurrentValue = parseInt(t['curjuka'])
            //     this.CurrentVolume = parseInt(t['volume'])
            // }).catch(e=>console.log(e))
            // krx.getStock(this.Code).then(v=>{
            //     this.CurrentValue = parseInt(v.price)
            //     this.CurrentVolume = parseInt(v.volume)
            // }).catch(e=>console.log(e))
        },30000);
    }
    
    get IsUp(){
        return this.Diff>0
    }

    get DiffCurrentClose(){        
        let per = Math.round( this.Diff/this.ClosePrice * 100)
        //let desc = `${per}%`
        return per
    }
    

   
}

