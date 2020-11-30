import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//import d from '../static/res.json'

import {StockValue} from '../models/Stock.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {    
    pricedata:null,
    loadingstate:false,
  },
  mutations: {
    initData(state,payload){
      try {
        console.log('mutation is working')
        if(state.pricedata!=null && state.pricedata!=undefined)
          state.pricedata.forEach(v=>v.StopSetInterval())
          state.pricedata = null
        
        let from = payload['from']
        let to = payload['to']
        console.log(from)
        console.log(to)
        //let url =`http://mojjijji.iptime.org:9898/api/DailyList?from=${from}&to=${to}`
        let url =`http://localhost:61608/api/DailyList?from=${from}&to=${to}`
        //let url = `https://jackpotapi.azurewebsites.net/dailylist?from=${from}&to=${to}`
        //let url = `http://127.0.0.1:5000/dailylist?from=${from}&to=${to}`
        console.log(url)
        state.loadingstate = true
        axios.get(url).then(v=>{
          console.log(v.data)
          let data = v.data
          console.log(data)
          let converted = data.map(v=>new StockValue(v))        
          state.pricedata = converted
          state.loadingstate=false
        }).catch(e=>console.log(e))
        
        

        
          
      } catch (error) {
        console.log(error)
      }
      
    }
  },
  actions: {
  },
  modules: {
  }
})
