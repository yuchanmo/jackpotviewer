import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//import d from '../static/res.json'

import {StockValue} from '../models/Stock.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {    
    pricedata:null
  },
  mutations: {
    async initData(state,payload){
      console.log('mutation is working')
      if(state.pricedata!=null && state.pricedata!=undefined)
        state.pricedata.forEach(v=>v.StopSetInterval())
        state.pricedata = null
      
      let from = payload['from']
      let to = payload['to']
      console.log(from)
      console.log(to)
      let url = `https://jackpotapi.azurewebsites.net/dailylist?from=${from}&to=${to}`
      //let url = `http://127.0.0.1:5000/dailylist?from=${from}&to=${to}`
      //console.log(url)
      let res = await axios.get(url)
      let data = JSON.parse(res.data)
      let converted = data.map(v=>new StockValue(v))
      console.log(converted[0])
      state.pricedata = converted
    }
  },
  actions: {
  },
  modules: {
  }
})
