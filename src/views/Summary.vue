<template>
    <v-container fluid > 
    
    <v-row align="start">   
        <v-col cols="12" sm="6" md="6">
            <div class="my-2">
            <v-text-field
            label="Issue 조회 시간 간격(min)"           
            v-model="interval"
            ></v-text-field>
            </div>
        </v-col>
    </v-row>
    <v-row class="{height:800px}">
    
    </v-row>
    <v-row align="start">
        <v-progress-circular
      :size="50"
      color="primary"
      indeterminate     
      v-show="loadingStatus"
    ></v-progress-circular>
    <v-row>
   <v-tabs m6
          v-model="tab"
          align-with-title
          align="start"
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab
            v-for="item in tabs"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      <v-row class="pa-md-10" align="start">
      
        <SummaryGrid v-show="tab===0"
        :dataSource="dataSource" 
        :loadingStatus="loadingStatus"/>
        <CurrentChart v-show="tab===1"
        :tabnum='tab'
         :min="interval"></CurrentChart>
      </v-row>
  </v-row>
  </v-row>
  </v-container>
</template>
<script>
import SummaryGrid from '../components/SummaryGrid';
//import SummaryPivotGrid from '../components/SummaryPivotGrid';
// import SummaryCount from '../components/SummaryCount';
import CurrentChart from '../components/CurrentChart';

import axios from 'axios'

export default {
    components:{    
      SummaryGrid,  
      CurrentChart,
  //    SummaryPivotGrid,    
        // SummaryCount,
    
    },
    methods:{
      loadData(){
      try {
                  //this.dataSource = []
                    this.loadingStatus = true            
                    console.log('LoadData')
                    var url = `http://mojjijji.iptime.org:8888/api/Jackpot?min=${this.interval}`
                    console.log(url)
                    axios.get(url).then((res)=>this.dataSource =res.data)
                    this.loadingStatus = false                    
             } catch (error) {
                this.dataSource = []
                this.loadingStatus = false
                console.log(error)
             }
      }
    },
    mounted(){
      this.$EventBus.$on('changeTab',(tabnum)=>{
        console.log(tabnum);
        this.tab=tabnum;})
      this.loadData();
        this.intervalId = setInterval(()=>{
            this.loadData();
        },10000)
    },
    unmounted(){
        if(this.intervalId!==null && this.intervalId!==undefined)
            clearInterval(this.intervalId)
    },
    data(){
        return {
            dataSource:[],
            interval:30,
            loadingStatus:false,
            selectedIndex:0,
            tab:'',
            tabs:["Grid","Chart"]
        }
    },
        
}
</script>
<style>
.up{
  color: red;
  font-weight: bold;
  
}

.down{
  color:blue;
  font-weight: 200;

}
</style>