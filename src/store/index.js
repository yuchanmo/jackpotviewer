import Vue from 'vue'
import Vuex from 'vuex'

import d from '../static/res.json'

import {StockValue} from '../models/Stock.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    original:d,
    pricedata:null
  },
  mutations: {
    initData(state,payload){
      console.log('mutation is working')
      state.pricedata = null
      let from = payload['from']
      let to = payload['to']
      console.log(from)
      console.log(to)
      let converted = state.original.filter(v=>v.Date>=from && v.Date<=to).map(v=>new StockValue(v))
      console.log(converted[0])
      state.pricedata = converted
    }
  },
  actions: {
  },
  modules: {
  }
})
