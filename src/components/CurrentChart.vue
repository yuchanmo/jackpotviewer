<template>
    <div id="chart">
      <DxChart
      id="chart"
      :data-source="chartSource"
      class="{width:100%;height:200px}"
    >
      <DxCommonSeriesSettings
        :type="type"
        argument-field="Regdate"
      />

       <DxSeries
        v-for="c in chartLegend"
        :key="c.value"
        :value-field="c.value"
        :name="c.name"
        color="darkblue"
      />
     
      <DxMargin :bottom="20"/>
      <DxArgumentAxis
        :value-margins-enabled="false"
        discrete-axis-division-mode="crossLabels"
      >
        <DxGrid :visible="true"/>
      </DxArgumentAxis>
      <DxLegend
        vertical-alignment="bottom"
        horizontal-alignment="center"
        item-text-position="bottom"
      />
      <DxExport :enabled="true"/>
      <DxTitle :text="title" id="tt"/>
      <DxTooltip :enabled="true"/>
    </DxChart>
    </div>
</template>
<script>
import axios from 'axios';


import {
  DxChart,
  DxSeries,
  DxArgumentAxis,
  DxCommonSeriesSettings,
  DxExport,
  DxGrid,
  DxMargin,
  DxLegend,
  
  DxTitle,
  DxTooltip
} from 'devextreme-vue/chart';

export default {
    components:{
         DxChart,
  DxSeries,
  DxArgumentAxis,
  DxCommonSeriesSettings,
  DxExport,
  DxGrid,
  DxMargin,
  DxLegend,
  
  DxTitle,
  DxTooltip

    },
    props:['min','tabnum'],
    data(){
        return{
            name:'',
        chartLegend:[
            {
                value:'curval',name:'현재가격',
            }
        ],        
        chartSource:[],
        code:null,   
        }

    },
    methods:{
        loadData(){
            try {                
                if(this.code!==undefined && this.code!==null && this.tabnum==1){                  
                    this.loadingStatus = true                                
                    var url = `http://mojjijji.iptime.org:8888/api/ChartData?min=${this.min}&code=${this.code}`                    
                    axios.get(url).then((res)=>this.chartSource =res.data)                    
                    console.log(this.chartSource)
                }                  
             } catch (error) {
                this.chartSource = []                
                console.log(error)
             }
        }
    },
    mounted(){
        this.$EventBus.$on('changeCode',(o)=>{            
            this.code = o.code;
            this.name = o.name;           
            this.loadData();
            });
            
        this.intervalId = setInterval(()=>{
            this.loadData();
        },15000)
    },
    unmounted(){
        if(this.intervalId!==null && this.intervalId!==undefined)
            clearInterval(this.intervalId)
    },
    computed:{
        title(){
            return `${this.name} - ${this.min} minutes chart`
        },
        hasdata(){
            return (this.code!==undefined && this.code!==null)
        }
    }
}
</script>
<style>
#chart{
    height:400px;
    width:700px;
}
#tt{
    color:darkblue
}
</style>