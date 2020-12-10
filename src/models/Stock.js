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
        this.Date =  new Date(v['Date'])
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
        this.DateDiff = (Math.ceil(timediff / (1000 * 60 * 60 * 24))-1).toString()+"일지남"
        
        this.chartLegend=[
            // { value: 'curval', name: '현재가격' },
            { value: 'diffval', name: '이전가격과 차이' },
            //{ value: 'diffhighval', name: '고가와차이' },
            //{ value: 'difflowval', name: '저가와차이' },
        ]
        
        // this.chartintervalId = setInterval(()=>{
        //     let url = `http://114.203.39.76:9999/api/CurrentChart?code=${this.Code}&duration=1`
        //     axios.get(url).then(v=>{     
        //         this.ChartSource = {code:'',name:'',legends:[],trends:[]}           
        //         this.ChartSource = {
        //             code : this.Code
        //             ,name : this.Name
        //             ,legends : this.chartLegend
        //             ,trends : v.data
        //         }  
        //         console.log(this.ChartSource)              
        //     }).catch(e=>console.log(e))
        // },20000)

        this.intervalId = setInterval(()=>{
            let url = `http://114.203.39.76:8888/api/CurrentValue?code=${this.Code}`
            axios.get(url).then(v=>{
                let tmp = v.data
                
                this.CurrentValue = tmp['curval']
                this.CurrentVolume = tmp['curvol']
                this.Diff = this.CurrentValue - this.ClosePrice
            }).catch(e=>console.log(e))
        },10000)
            
    }

    StopSetInterval(){
        if(this.intervalId!=null && this.intervalId!=undefined)
            console.log(`clear set interval ${this.intervalId}`);
            clearInterval(this.intervalId);
            clearInterval(this.chartintervalId);
    }
    
    setChartValue(){
        this.ChartSource = {
            legends:[
            { value: 'hydro', name: 'Hydro-electric' },
            // { value: 'oil', name: 'Oil' },
            // { value: 'gas', name: 'Natural gas' },
            // { value: 'coal', name: 'Coal' },
            // { value: 'nuclear', name: 'Nuclear' }
            ],
            values:
            [{
        country: 'USA',
        hydro: 59.8,
        oil: 937.6,
        gas: 582,
        coal: 564.3,
        nuclear: 187.9
      }, {
        country: 'China',
        hydro: 74.2,
        oil: 308.6,
        gas: 35.1,
        coal: 956.9,
        nuclear: 11.3
      }, {
        country: 'Russia',
        hydro: 40,
        oil: 128.5,
        gas: 361.8,
        coal: 105,
        nuclear: 32.4
      }, {
        country: 'Japan',
        hydro: 22.6,
        oil: 241.5,
        gas: 64.9,
        coal: 120.8,
        nuclear: 64.8
      }, {
        country: 'India',
        hydro: 19,
        oil: 119.3,
        gas: 28.9,
        coal: 204.8,
        nuclear: 3.8
      }, {
        country: 'Germany',
        hydro: 6.1,
        oil: 123.6,
        gas: 77.3,
        coal: 85.7,
        nuclear: 37.8
      }]
    }
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

