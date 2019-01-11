<template>
    <div class="container">
      <!--<span>{{dataArr}}</span>-->
      <el-table
        :data="tableData2"
        style="width: 100%"  >
        <el-table-column v-for="(item,key) in tableData2[0] " :key="key"  :row-class-name="tableRowClassName"
                         :label="key"
                         :prop="key"
                         width="180">
        </el-table-column>

      </el-table>
      <div class="block">

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="countdata">
        </el-pagination>
      </div>
    </div>


</template>

<script>
  import {getall,getcount} from "../../api";

  export default {
        name: "foods",
        data(){
          return {
            tableData2: [],
            tableData1: [],
            pageIndex: 2,
            countnum: 5,
            countdata:0,
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4
          }
        },
      created(){
        this.qiehuan();
        getcount(1).then(res=>{
           this.countdata=res.data;
        })
      },
    computed:{
      dataArr(){
        return this.tableData[0];
      }
    },
    methods:{
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';

      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.countnum=val;
        this.qiehuan();
      },
      handleCurrentChange(val) {
        this.pageIndex=val;
        this.qiehuan();
      },
      qiehuan(){
        getall(this.pageIndex,this.countnum).then(
          res=>{
            this.tableData2=[];
            this.tableData1=res.data;
            let that=this;
            this.tableData1.forEach(function (v,k,a) {
              let obj={};
              obj.cbname=v.cbname;
              obj.cbscore=v.cbscore;
              obj.cbtag=v.cbtag;
              obj.cookbookid=v.cookbookid;
              obj.createtime=v.createtime;
              that.tableData2.push(obj);
            })
          }
        )
      },

    }

    }
</script>

<style >
  .bg{
    background: darkseagreen;
  }
.warning-row {
    background: oldlace;
  }

  .success-row {
    background: #f0f9eb;
  }
</style>
