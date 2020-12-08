<template>
    <v-container fluid>
    <v-row>   
        <v-col cols="12" sm="6" md="6">
            <div class="my-2">
            <v-text-field
            label="Issue 조회 시간 간격(min)"           
            v-model="interval"
            ></v-text-field>
            </div>
        </v-col>
    </v-row>
    <v-row  align='center'
      justify='center'>
        <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
     
      v-show="loadingStatus"
    ></v-progress-circular>
<DxDataGrid
v-show="!loadingStatus"
    :data-source="dataSource"
    :repaint-changes-only="true"    
    :allow-column-reordering="true"
    :row-alternation-enabled="true"
    :show-borders="true"
    @content-ready="onContentReady"
  >
  <DxLoadingIndicator :enabled="loadingStatus"></DxLoadingIndicator>
   <!-- <DxFilterRow
        :visible="showFilterRow"
        :apply-filter="true"
      /> -->
      <DxHeaderFilter
        :visible="showHeaderFilter"
      />
   <DxColumn          
      data-field="Regdate"
      :width=150
    />
    <DxColumn          
      data-field="name"
      :width=100
    />  
    <DxColumn
      data-field="Url"
      caption="NAVER증권"      
      alignment="center"
      cell-template="cellTemplate"
      :width=50
    />  
    <DxColumn          
      data-field="startval"
      caption="시작가"
      :width=100
    />  
    <DxColumn          
      data-field="curval"
      caption="현재가"
      :width=100
    />  
     <DxColumn          
      data-field="curval_1diff"
      caption="직전가격차(%)"
      cell-template="diffCellTemplate"
      :width=100
    />  
      <DxColumn          
      data-field="startval_curval_diff"
      caption="시작가격차(%)"
      cell-template="diffCellTemplate"
      :width=100
    />  
    <DxColumn          
      data-field="curvol"
      caption="물량"
      :width=100
    />  
    
    <!-- <DxColumn          
      data-field="curval_3diff"
      caption="3직전가격차(%)"
      :width=50
    />   -->
     <DxColumn          
      data-field="curvol_1diff"
      caption="직전물량차(%)"
      cell-template="diffCellTemplate"
      :width=100
    />      
  
    <DxColumn          
      data-field="startvol_curvol_diff"
      caption="시작물량차(%)"
      cell-template="diffCellTemplate"
      :width=100
    />  
     <DxColumn          
      data-field="val_infle"
      caption="가격변곡점?"
      cell-template="infCellTemplate"
      :width=90
    />  
    <DxColumn          
      data-field="vol_infle"
      caption="물량변곡점?"
      cell-template="infCellTemplate"
      :width=90
    />  
    <DxColumn          
      data-field="minmax"
      caption="최근3저점고점?"
      :width=100
    />  
    
    <template #diffCellTemplate="{data}">
      <div :class="{up:data.value>0,down:data.value<0}">{{data.value.toFixed(1)}}%</div>
    </template>

    <template #infCellTemplate="{data}">
      <div :class="{up:data.value==1,down:data.value==0}">{{data.value}}</div>
    </template>
      

    <template #cellTemplate="{data}">
      <a :href="data.value" target="_blank">GO</a>
    </template>

       
    <DxGroupPanel :visible="true"/>    
    <DxGrouping :auto-expand-all="true"/>
    
     <DxFilterRow
        :visible="true"        
      />
      <DxHeaderFilter
        :visible="true"
      />
  </DxDataGrid>
    </v-row>
  </v-container>
</template>
<script>
import {
  DxDataGrid,
  DxColumn,
  DxGrouping,
  DxGroupPanel,  
  DxHeaderFilter,  
  DxFilterRow,    
} from 'devextreme-vue/data-grid'


import axios from 'axios'

export default {
    components:{
        DxDataGrid,
        DxColumn,
        DxGrouping,
        DxGroupPanel, 
        DxHeaderFilter,    
        DxFilterRow ,
    },
    mounted(){
        this.intervalId = setInterval(()=>{
            try {
                    this.loadingStatus = true            
                    console.log('LoadData')
                    var url = `http://114.203.39.76:9999/api/Jackpot?min=${this.interval}`
                    console.log(url)
                    axios.get(url).then((res)=>this.dataSource =res.data)
                    this.loadingStatus = false
             } catch (error) {
                this.dataSource = []
                this.loadingStatus = false
                console.log(error)
             }
        },5000)
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
        }
    },
    methods:{
         getSummaryData(){
             

        }
    }
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