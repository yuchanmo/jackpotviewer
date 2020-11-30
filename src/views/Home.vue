<template>
  <v-container>
    <v-row>
    <v-col cols="12" sm="5" md="5">
      <v-menu
        ref="frommenu"
        v-model="frommenu"
        :close-on-content-click="false"
        :return-value.sync="fromdate"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="fromdate"
            label="FromTime"            
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="fromdate" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.frommenu.save(fromdate)">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
        <v-col cols="12" sm="5" md="5">
      <v-menu
        ref="tomenu"
        v-model="tomenu"
        :close-on-content-click="false"
        :return-value.sync="todate"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="todate"
            label="ToTime"            
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="todate" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.tomenu.save(todate)">OK</v-btn>
        </v-date-picker>
      </v-menu>
</v-col>
<v-col cols="12" sm="2" md="2">
  <div class="my-2">
   <v-btn color="primary" @click="searchData">SEARCH</v-btn>
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
    <!-- <DxColumn      
    :group-index="0"
      data-field="Cate"
    /> -->
    <DxColumn      
    
      data-field="Cate"
    />
    <DxColumn
      data-field="Date"
      caption="추출날짜"      
      alignment="center"
    />
    <DxColumn
      data-field="DateDiff"
      caption="시간흐름"     
      alignment="center"
      v-if="$vuetify.breakpoint.lg"
    />
    <DxColumn
      data-field="KospiKosdaq"
      caption="코스피/코스닥"      
      alignment="center"
      v-if="$vuetify.breakpoint.lg"
    />    
    <!-- <DxColumn
      data-field="Code"
      caption="Code"      
      alignment="right"
    /> -->
        <DxColumn
      data-field="Name"
      caption="이름"      
      alignment="center"
    />
    
    
    <DxColumn
      data-field="rank"
      caption="단일가RANK"      
      alignment="center"
      v-if="$vuetify.breakpoint.lg"
    />
    <DxColumn
      data-field="CurrentValue"
      caption="현재가"      
      alignment="center"
    />
    <DxColumn
      data-field="DiffCurrentClose"
      caption="현재-추출일(%)"      
      alignment="center"
      cell-template="diffCellTemplate"
      
    />
    <DxColumn
      data-field="CurrentVolume"
      caption="거래량"      
      alignment="center"
    />
    <DxColumn
      data-field="TradePrice"
      caption="추출일단일가"      
      alignment="center"
      v-if="$vuetify.breakpoint.lg"
    />
    <DxColumn
      data-field="ClosePrice"
      caption="추출일종가"      
      alignment="center"
    />
    <DxColumn
      data-field="Url"
      caption="NAVER증권"      
      alignment="center"
      cell-template="cellTemplate"
    />
    <template #cellTemplate="{data}">
      <a :href="data.value" target="_blank">GO</a>
    </template>
    <template #diffCellTemplate="{data}">
      <div :class="{up:data.value>0,down:data.value<0}">{{data.value}}%</div>
    </template>

    <DxGroupPanel :visible="true"/>
    <!-- <DxSearchPanel
      :visible="true"
      :highlight-case-sensitive="true"
    /> -->
    <DxGrouping :auto-expand-all="true"/>
    <!-- <DxPager
      :allowed-page-sizes="pageSizes"
      :show-page-size-selector="true"
    /> -->
    <!-- <DxPaging :page-size="10"/> -->
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
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
// import axios from 'axios'
// import data from '../static/res.json'
import {
  DxDataGrid,
  DxColumn,
  DxGrouping,
  DxGroupPanel,  
  DxHeaderFilter,  
  DxFilterRow, 
  
} from 'devextreme-vue/data-grid';
import {
    DxLoadingIndicator
} from 'devextreme-vue/chart';
// import DataSource from 'devextreme/data/data_source';
import 'devextreme/data/odata/store';

let today = new Date()
const yesterday = new Date(today)
yesterday.setDate(yesterday.getDate() - 1)

function formatDate(date) 
{ var d = new Date(date)
, month = '' + (d.getMonth() + 1)
, day = '' + d.getDate()
, year = d.getFullYear(); 
if (month.length < 2) 
  month = '0' + month; 
if (day.length < 2) 
  day = '0' + day; 
  return [year, month, day].join('-'); 
}

let todaystring = formatDate(today)
let yesterdaystring = formatDate(yesterday)

let collapsed = false;
export default {
  name: 'Home',
  components: {
    //HelloWorld
    DxDataGrid,
    DxColumn,
    DxGrouping,
    DxGroupPanel, 
    DxHeaderFilter,
    DxLoadingIndicator,  
  DxFilterRow   
    
  },
  computed:{
    dataSource(){
      return this.$store.state.pricedata
    },
    loadingStatus(){
      return this.$store.state.loadingstate
    }
  },
  data(){
    return {    
      fromdate:yesterdaystring,
      todate:todaystring,
      frommenu: false,           
      tomenu:false,
      iternum:0,
        showFilterRow: true,
      showHeaderFilter: true,
      updateWorker:null,      
      onContentReady: function(e) {
        if (!collapsed) {
          e.component.expandRow(['EnviroCare']);
          collapsed = true;
        }
      }
    }
  },
  mounted(){      
  },
  beforeDestroy(){
  },
  
  methods:{
    searchData(){
      console.log('search',this.fromdate,this.todate)
      
      this.$store.commit("initData",{from:this.fromdate, to:this.todate})
    }
  }
}
</script>
<style scoped>
.up{
  color: red;
  font-weight: bold;
  
}

.down{
  color:blue;
  font-weight: 200;

}
</style>
