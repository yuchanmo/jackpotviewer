// <template>
//     <div>
//     <DxPivotGrid
//       v-show="!loadingStatus"
//       id="pivotgrid"
//       ref="grid"
//       :data-source="source"
//       :allow-sorting-by-summary="true"
//       :allow-filtering="true"
//       :show-borders="true"
//       :show-column-grand-totals="false"
//       :show-row-grand-totals="false"
//       :show-row-totals="false"
//       :show-column-totals="false"
//     >
//       <DxFieldChooser
//         :enabled="true"
//         :height="400"
//       />
//     </DxPivotGrid>
//     </div>
// </template>
// <script>
// import {
//   DxPivotGrid,
//   DxFieldChooser
// } from 'devextreme-vue/pivot-grid';
// import { createStore } from 'devextreme-aspnet-data-nojquery';
// export default {
//     components: {
//           DxPivotGrid,
//         DxFieldChooser,
//     },
//     props:['dataSource','loadingStatus','interval'],
//     mounted(){
//         this.$EventBus.$on('refreshData',(d)=>{
            
//             this.source.store = d;
//             console.log(d);
//         })
//     },
//     data(){
//         return{
//             source:{
//                 fields:[
//                     {
//                         caption:'Name',
//                         width:250,
//                         dataField:'name',
//                         area:'row',                        
//                     },
//                     {
//                         dataField:'Hour',
//                         dataType:'number',
//                         area:'column',
//                     },
//                     {
//                         caption:'Total',
//                         dataField:'One',
//                         dataType :'number',
//                         summaryType:'sum',
//                         area:'data'
//                     }
//                 ],
//                 remoteOperations: true,
//                 store:createStore({
//                     key:'JackpotId',
//                     loadUrl:`http://114.203.39.76:8888/api/Jackpot?min=${this.interval}`
//                 })
//             }
//         }
//     },

// }
// </script>
// <style>

// </style>