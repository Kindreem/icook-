<template>
<div class="container">
  <div class="layui-form">
    <table class="layui-table" >
      <thead>
      <tr>
        <th v-for="(item,key) in arr">
          {{item}}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,key) in data">
        <td>{{item.factionsid}}</td>
        <td>{{item.factionsname}}</td>
        <td>
          <a class="layui-btn layui-btn-primary layui-btn-xs" @click="showDetail(key)">查看</a>
          <!--<a class="layui-btn layui-btn-xs" >编辑</a>-->
          <!--<a class="layui-btn layui-btn-danger layui-btn-xs">删除</a>-->
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <!-- Form -->

  <el-dialog title="流派详情" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="流派ID:" :label-width="formLabelWidth" class="lbe">
         <span>{{this.detail.factionsid}}</span><br>
      </el-form-item>
      <el-form-item label="流派图片:" :label-width="formLabelWidth" class="lbe">
        <img :src="this.detail.factionsimg" alt="">
      </el-form-item>
      <el-form-item label="菜系详情:" :label-width="formLabelWidth" class="lbe">
      <span>{{this.detail.factionsname}}</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>

</div>


</template>

<script>

  import {faction} from "../../api";

  export default {
    name: "genre",
    data(){
      return {
        data:[],//获取所以流派
        arr:['编号','流派','操作'] ,//标题
        detail:{},
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      };

    },
    created(){
      faction(1).then(res=>{
        this.data=res.data;
        console.log(this.data);
      })
    },
    computed:{

    },
    methods:{
        //显示详情
      showDetail(key){
        this.detail=this.data[key];
        console.log( this.detail);
        this.dialogFormVisible=true;
      }
    }
  }
</script>

<style >
    .lbe{
      display: block;
      text-align-last: left;
      line-height: 100%;
    }
</style>
