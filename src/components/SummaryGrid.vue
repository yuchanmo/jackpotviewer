<template>
<div>
    <DxDataGrid
    v-show="!loadingStatus"
    :selection="{ mode: 'single' }"
    :data-source="dataSource"
    :repaint-changes-only="true"    
    :allow-column-reordering="true"
    :row-alternation-enabled="true"
    :show-borders="true"
    :hover-state-enabled="true"
    @content-ready="onContentReady"
    @selection-changed="onSelectionChanged"
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
      sort-order="desc"
    />
    <DxColumn          
      data-field="name"
      :width=100
    /> 
     <DxColumn          
      data-field="cnt"
      :width=90
      sort-order="desc"
      caption="횟수"
    /> 
     <DxColumn          
      data-field="revert_trend"
      caption="반전"
      :width=90
      sort-order="desc"
    /> 

     <DxColumn          
      data-field="cate"
      :width=50
      
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
      sort-order="desc"
    />  
      <DxColumn          
      data-field="startval_curval_diff"
      caption="시작가격차(%)"
      cell-template="diffCellTemplate"
      :width=100
      sort-order="desc"
    />  
    <DxColumn          
      data-field="curvol"
      caption="물량"
      :width=100
      sort-order="desc"
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
      sort-order="desc"
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
      :width=60
      v-if="$vuetify.breakpoint.lg"
    />  
    <DxColumn          
      data-field="vol_infle"
      caption="물량변곡점?"
      cell-template="infCellTemplate"
      :width=60
      v-if="$vuetify.breakpoint.lg"
    />  
    <DxColumn          
      data-field="low"
      caption="저점"
      :width=60
    />  
    <DxColumn          
      data-field="low"
      caption="고점"
      :width=60
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
    mounted(){
      
    },
    props:[
        'dataSource','loadingStatus'
    ],
    data(){
      return {
        selectedData:null
      }
    },
     methods: {
    onSelectionChanged({ selectedRowsData }) {
      
      const data = selectedRowsData[0];
      
      if(this.selectedData === data){
        this.selectedData = null;
        this.$EventBus.$emit('changeCode',null);
        this.$EventBUs.$emit('changeTab',0)
      }
      
      else{
        this.selectedData = data;      
      
        this.$EventBus.$emit('changeCode',{code:data.code,name:data.name});
        this.$EventBUs.$emit('changeTab',1)
      }
      
      

      // this.showEmployeeInfo = !!data;
      // this.selectedRowNotes = data && data.Notes;
      // this.selectedRowPicture = data && data.Picture;
    }
  }
}
</script>

<style>

</style>