<template>
    <div>
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
      data-field="name"
      :width=200
    />  
    <DxColumn          
      data-field="date"
      :width=200
      sort-order="desc"
    />  
    <DxColumn          
      data-field="cnt"
      caption='cnt'
      :width=150
      sort-order="desc"
    />    
       
       <DxColumn          
      data-field="code"
      caption='code'
      :width=150
    />    

    <DxGroupPanel :visible="true"/>    
    <DxGrouping :auto-expand-all="true"/>
    <DxScrolling mode="infinite"/>
     <DxFilterRow
        :visible="true"        
      />
      <DxHeaderFilter
        :visible="true"
      />
  </DxDataGrid>
    </div>
</template>
<script>
import {
  DxDataGrid,
  DxColumn,
  DxGrouping,
  DxGroupPanel,  
  DxHeaderFilter,  
  DxFilterRow,   
  DxScrolling 
} from 'devextreme-vue/data-grid'
import axios from 'axios'
export default {
    components:{
        DxDataGrid,
        DxColumn,
        DxGrouping,
        DxGroupPanel,  
        DxHeaderFilter,  
        DxFilterRow, 
        DxScrolling
    },
    props:[
        'interval','loadingStatus'
    ],
    methods:{
        loadData(){
            try {
                  //this.dataSource = []
                    this.loadingStatus = true            
                    console.log('LoadData')
                    var url = `http://mojjijji.iptime.org:8888/api/JackpotCount?min=${this.interval}`
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
        this.loadData();
        this.intervalId = setInterval(()=>{
            this.loadData();
        },10000)
    },
    unmounted(){
        if(this.intervalId!==null && this.intervalId!==undefined)
            clearInterval(this.intervalId)
    },
}
</script>
