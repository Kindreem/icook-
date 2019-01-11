<template>
  <div class="container">
    <el-form label-position="right" label-width="80px"  class="form" >
      <el-form-item class="food_title_box" >
        <span class="food_title">添加菜谱食材加工步骤</span>
      </el-form-item>
      <!--<el-form-item label="菜谱名" >-->
        <!--<el-col :span="12">-->
          <!--<el-autocomplete-->
            <!--class="inline-input"-->
            <!--v-model="state1"-->
            <!--:fetch-suggestions="querySearch"-->
            <!--placeholder="请输入内容"-->
            <!--@select="handleSelect1"-->
            <!--:disabled="readonlyShow"-->
          <!--&gt;</el-autocomplete>-->
        <!--</el-col>-->
      <!--</el-form-item>-->
      <el-form-item label="菜谱名">
        <span>{{this.cookbookname}}</span>
      </el-form-item>
      <el-form-item label="食材" >
        <el-select v-model="selected1" placeholder="请选择食材" class="select">
          <el-option
            v-for="(item,key) in optionsfirst"
            :key="key"
            :label="item.extendname"
            :value="key"
            @click.native="first(item,key)"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="处理步骤">
        <el-input type="textarea" rows="4" v-model.trim="data[0].handlingname" @input="changeipt(data[0].handlingname)" class="select select_step"></el-input>
      </el-form-item>
      <el-form-item label="步骤勾选">
        <el-checkbox v-model="checked" :value="data[0].handlinglength">步骤过长应勾选此项</el-checkbox>
      </el-form-item>
      <!--<div class="btn_box">-->
      <el-form-item >
        <el-button style="margin-top: 12px;" type="primary" @click="prevSetp" >上一步</el-button>
        <el-button style="margin-top: 12px;" @click="next(data[0].handlingname,data[0].handlinglength)" type="primary" class="successbtn" >食材加工</el-button>
        <!--<el-button style="margin-top: 12px;" type="primary" @click="nextSetp" :disabled="this.showsubmitBtn">提交</el-button>-->
        <el-button style="margin-top: 12px;" type="primary" @click="nextSetp1">跳过</el-button>
        <!--<el-button  style="margin-top: 12px;" type="primary" v-show="dataArr.length>6">完成</el-button>-->
      </el-form-item>
      <!--</div>-->
    </el-form>
    <table class="layui-table table" >
      <thead>
      <tr>
        <th>类型</th>
        <th>食材名</th>
        <th>处理步骤</th>
        <th>勾选</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,key) in dataArr" class="handlingtr">
        <td class="handling_text">{{item.extendtype==1?"食材":item.extendtype==2?"调料":"辅料"}}</td>
        <td class="handling_text">{{item.name}}</td>
        <td ><p class="handlingname">{{item.handlingname}}</p></td>
        <td class="handling_text">{{item.handlinglength==0?'未勾选':'已勾选'}}</td>
        <td class="handling_text">
          <a class="layui-btn layui-btn-danger layui-btn-xs" @click="remove(item,key)">删除</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import {delbookhandling,ethandlingmaterial,getbookhandling,addhandling,foodcount,getfoods,getall,getcount,getfood,condiments,condimentcount} from  "../../api";
  export default {
    name: "step3addfood",
    data() {
      return {
        //食材搜索的值
        selected1:'',
        //菜谱id
        cookbookid :'',
        //菜谱名
        cookbookname:'',
        //所有食材
        optionsfirst:[],
        // //存储单个食材加工对象
        data:[{
          //菜谱名
          cookbookid: '',
          //食材加工id
          extendid: '',
          //食材加工类型
          extendtype: '',
          //加工描述
          handlingname:'',
          //复选框是否被选中 默认0不选中
          handlinglength:'0'
        }],
        //存储所有加工步骤的数组
        dataArr:[],

        // sendDataArr:[],

        obj:{},//存储本地缓存传过来的cookbookid cookbookname

        checked:false,//复选框默认不选中,
      }
    },
    created(){
      //如果lcoalstrong 取到值 就给obj赋值
      if(this.$_store.get('data','object')){
        this.obj=this.$_store.get('data','object');
      }
      else {
        this.obj={};
      }
      //获取当前菜谱名
      this.cookbookname=this.obj.cookbookname;
      //获取当前菜谱id
      this.data[0].cookbookid=this.obj.cookbookid;
     //获取当前已有食材填充到下拉列表里
      ethandlingmaterial(this.data[0].cookbookid).then(res=>{
       this.optionsfirst=res.data;
       console.log(this.optionsfirst);
      });
      //获取当前菜谱已有食材加工步骤
      getbookhandling( this.data[0].cookbookid).then(res=>{
       this.dataArr=res.data||[];
      })
    },
    methods:{
      //下拉列表点击事件
      first(item,key){
        //获取加工食材id 及 name
        this.data[0].extendid=item.extendid;
        this.data[0].extendtype=item.extendtype;
        // console.log(item);
        // this.data.name=item.extendname;
      },
      //点击添加食材加工事件
      next(handlingname,handlinglength){
        //检验是填入参数是否为空+
        if(this.data.handlingname===''||this.data.selected1===''){
          this.$alert('所填信息非法', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          })
        }else {
          //调用去除字符串所有空格的方法
          handlingname=this.Trim(handlingname,"g");
          //将得到的食材加工信息存储在data数组里面
          this.data[0].handlingname=handlingname;
          this.data[0].handlinglength=handlinglength;
          let that=this;
          console.log(that.data);
          addhandling(this.data).then(res=>{
            // console.log(res);
            if(res.code===200){
              //添加成功后清空data数组里面的值
              this.data[0].handlingname= '';
              this.data[0].handlinglength= '0';
              this.checked=false;
              this.data[0].extendid= '';
              this.data[0].extendtype= '';
              this.selected1='';
              this.dataArr = [];
              // console.log(this.data);
              //重新拉取食材数据刷新
              getbookhandling(this.data[0].cookbookid).then(res=>{
                console.log(res);
                if(res.code===200){

                  this.dataArr=res.data;
                  // console.log(that.dataArr)
                  this.$message({
                    message: '添加成功！点跳过此步骤进入下一步',
                    type: 'success',
                    duration:1000,
                    center: true
                  });
                }
              })
            }
            if(res.code===500){
              this.$message({
                message: '未选择食材',
                type: 'error',
                duration:1000,
                center: true
              });
            }
            else {
              this.$message({
                message: '添加失败！',
                type: 'error',
                duration:1000,
                center: true
              });
            }
          })
        }
      },
      //上一步按钮事件
      prevSetp(){
        //跳转到上一页 辅料页
        this.$router.push({
          path:'/step3addfood',
          query:{
            flag:true,
          }
        });
        this.$bus.$emit('prevgo',3)
      },
      //跳过此步骤按钮事件
      nextSetp1(){
        //跳转到下一页 食材烹饪页
        this.$router.push({
          path:'/step5addfood',
          query:{
            flag:true,
          }
        });
        this.$bus.$emit('nextgo',5)
      },
      //表格删除事件按钮
      remove(item,key){
        let that=this;
        //请求删除当前点击的这条数据
        delbookhandling(item.bhid).then(res=>{
          if(res.code===200){
            //如果成功从当前位置截取1位 改变原数组
            that.dataArr.splice(key,1);
            this.$message({
              message: '删除成功!',
              type: 'warning',
              duration:1000,
              center: true
            });
          }
        })
      },
      //去除字符串中间空格
      Trim(str,is_global)
      {
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g,"");
        if(is_global.toLowerCase()=="g")
        {
          result = result.replace(/\s/g,"");
        }
        return result;
      },
      //判断textarea的字数的长度
      changeipt(val){
        let valueitem=this.Trim(val,"g");
        if(valueitem&&valueitem.length>=8){
           this.checked=true;
           this.data[0].handlinglength="1";
       }else {
          this.checked=false;
          this.data[0].handlinglength="0";
        }
      }
    },
    mounted(){
    },
    watch:{
      //监视复选框是否被选中 选中为1 否则为0
      checked(newval,oldval){
        newval?this.data[0].handlinglength='1':this.data[0].handlinglength='0';
        // console.log(this.checkVal)
      },

    }
  }
</script>

<style scoped>
  .form,.form_first{
    margin-top: 50px;
    width:400px;
    /*margin-left: 50px;*/
  }
  .successbtn{
    /*margin-left: 40px;*/
  }
  .food_title{
    font-size: 20px;
  }
  .food_title_box{
    text-align: center;
  }
  .btn_box{
    text-align: center;
  }
  .weight_ipt,.describe_ipt,.ipt,.search_ipt2,.search_ipt1{
    display: inline-block;
    width: 80%;
  }
  .inline-input{
    width:255px;
  }
  .table,.form{
    display: inline-block;
    vertical-align: middle;
  }
  .table{
    margin-left: 80px;
    margin-top: 50px;
    width:630px;
  }
  .form{
    width:600px;
  }
  .select{
    width: 255px;
  }
  .select_step{
    width:85%;
  }
  .handlingtr{

  }
  .handlingname{
    width: 300px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap

  }

</style>
