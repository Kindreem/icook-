<template>
  <div class="box">
    <div class="container"  >
      <div class="title">
        <span class="food_title">添加菜谱食材烹饪步骤</span><br>
        <span>菜谱名:</span>
        <span>{{cookbookname}}</span>
      </div>
      <el-form label-position="right" label-width="100px"  class="form" v-for="(item,key) in arr" :key="key">

        <el-form-item class="icon_box" label="步骤：" >
          <span>第</span>
          <el-input class="step_text" v-model.trim="item.step"></el-input>
          <span>步</span>
        </el-form-item>
        <el-form-item class="icon_box1" label="烹饪对象：" >
          <el-input v-model.trim="item.cookdemo" class="ipt"></el-input>
          <i class="el-icon-circle-close icon_size" @click="del(item,key,arr)" ></i>
        </el-form-item>
        <el-form-item class="icon_box1" label="烹饪步骤：" >
          <el-input v-model.trim="item.description" class="ipt"></el-input>
          <i class="el-icon-circle-plus icon_size" @click="addstep(item,key)" v-if="key===arr.length-1"></i>
        </el-form-item>
      </el-form>
      <div class="btn_box">
        <el-button style="margin-top: 12px;" type="primary" class="btn_prev" @click="prevSetp" >上一步</el-button>
        <!--<i class="el-icon-circle-plus icon_size" @click="addstep" ></i>-->
        <el-button style="margin-top: 12px;" type="primary" @click="nextStep" >提交</el-button>
        <el-button style="margin-top: 12px;" type="primary" @click="nextStep1" >跳过此步</el-button>
      </div>
    </div>
    <table class="layui-table table" >
      <thead>
      <tr>
        <th>步骤</th>
        <th>烹饪详情</th>
        <th>时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,key) in dataArr">
        <td>{{item.step}}</td>
        <td>{{item.description}}</td>
        <td>{{item.createtime}}</td>
        <td>
          <a class="layui-btn layui-btn-danger layui-btn-xs" @click="remove(item,key)">删除</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>
<script>
  import {addcooks,delbookcookstep,getbookcookstep} from  "../../api";
    export default {
        name: "step5addfood",
      data(){
          return{
            //菜谱名
            cookbookname:'',
            //菜谱id
            cookbookid:'',
            //存储单个烹饪对象
            arr:[
                {
                  //菜谱id
                  cookbookid: 0,
                  //烹饪描述
                  description: "",
                  //烹饪对象
                  cookdemo:"",
                  //步骤
                  step:1
                }
              ],
            //发送的数组
            sendarr:[],
            //表格显示的数组
            dataArr:[],

            //判断填入的参数是否正确
            flag:false,
            obj:{}//存储本地缓存传过来的cookbookid cookbookname
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
        this.cookbookid=this.obj.cookbookid;
        //获取当前菜谱已有加工步骤
        getbookcookstep(this.cookbookid ).then(res=>{
          this.dataArr=res.data||[];
          // console.log(this.dataArr);
        });
      },
      methods:{

          //添加步骤的加号事件
        addstep(item,key){
          //定义一个复制对象
          let obj= {
            cookbookid: 0,
            cookdemo: "",
            description:"",
            step:1
          };
          //判断如果填入的值为空就弹框
            if(item.description===''||item.cookdemo===''){
                this.$alert('请先填详细信息', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                  }
                });
            }
            else if(item.step==0){
              this.$alert('步骤不可更改为0', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
              });
            }
            else {
              //复制存储每点一次加号步骤加1
              obj.step=parseInt(item.step)+1;
              //将obj每次存入表格显示的数组arr中
                this.arr.push(obj);
                //循环表格数组arr让每一项的cookbookid都为本地缓存的cookbookid
                this.arr.forEach((v,k,a)=>{
                  v.cookbookid=this.cookbookid
                })
            }
          // console.log(this.arr);
        },
        //删除步骤关闭标签
        del(item,key,arr){
           key!==0&& this.arr.splice(key,1);
        },
        //点击提交事件
        nextStep(){
          //循环表格的arr数组
          this.arr.forEach((v,k,a)=>{
            //如果有空的
            if(v.description===""||v.cookdemo===""||v.step==0||v.step===""){
              //清空sendarr数组
              this.sendarr=[];
              this.$alert('描述不能为空,且步骤不可为空或0', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
              });
              //判断验证是否通过
             return  this.flag=false;
            }
            else if(v.cookbookid===undefined){
              this.$alert('菜谱丢失，请从第一步开始', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
              })
              //判断验证是否通过
              return this.flag=false;
            }
            else{
              //接口传输对象
              let senditem ={
                cookbookid: 0,
                description:"",
                step:1
              }
              //数组对象深度拷贝
              let item = JSON.parse(JSON.stringify(v));
              //接口传输对象深度拷贝
              let itemobj = JSON.parse(JSON.stringify(senditem));
              itemobj.cookbookid = this.cookbookid;
              itemobj.description = item.cookdemo + "$" + item.description;
              itemobj.step = item.step;
              //接口数据添加
              this.sendarr.push(itemobj)
              //验证通过
            return this.flag=true;
            }
          });
          // console.log(this.arr);
          // console.log(this.sendarr);

          let that=this;
          //如果验证通过就发请求
          if(this.flag){
            addcooks(this.sendarr).then(res=>{
              //清空所有数组
              this.arr=[
                {
                  //菜谱id
                  cookbookid: 0,
                  //烹饪描述
                  description: "",
                  //烹饪对象
                  cookdemo:"",
                  //步骤
                  step:1
                }
              ];
              this.dataArr=[];
              this.sendarr=[];
              //发送提交步骤请求
              getbookcookstep(this.cookbookid).then(res=>{
                console.log(res);
                this.dataArr=res.data||[];
                // that.showsubmitBtn=!that.showsubmitBtn;
                this.$message({
                  message: '添加成功！点跳过此步骤进入下一步',
                  type: 'success',
                  duration:800,
                  center: true
                });
              });
            })
          }

        },
        //跳过此步骤事件 跳转到食材装盘步骤页
        nextStep1(){
          this.$router.push({
            path:'/step6addfood',
            query:{
              flag:true,
            }
          });
          this.$bus.$emit('nextgo',6)
        },
        //上一步 事件 跳转到食材加工页
        prevSetp(){
          this.$router.push({
            path:'/step4addfood',
            query:{
              flag:true,
            }
          });
          this.$bus.$emit('prevgo',4)
        },
        //删除步骤
        remove(item,key){
          delbookcookstep(item.bcid).then(res=>{
               if(res.code===200){
                 //如果成功从当前位置截取1位 改变原数组
                 this.dataArr.splice(key,1);
                 this.$message({
                   message: '删除步骤成功',
                   type: 'warning',
                   duration:800,
                   center: true
                 });
               }
          })
        }
      }
    }
</script>

<style scoped>
  .container{
    display: inline-block;
  }
  .title{
    margin-top: 50px;
    padding-left: 40px;
    box-sizing: border-box;
    color: #606266;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
  }
  /*.form{*/
    /*!*margin-top: 50px;*!*/
    /*!*width:500px;*!*/
    /*!*display: inline-block;*!*/

  /*}*/
  .form,.form_first{
    margin-top: 50px;
    width:500px;
    /*margin-left: 50px;*/
  }
  .food_title{
    font-size: 20px;
  }
  .icon_box{
    /*display: inline-block;*/
    /*vertical-align: middle;*/
  }
  .icon_box1{
    /*display: inline-block;*/
    vertical-align: middle;
  }
  .icon_size{
    display: inline-block;
    font-size: 30px;
    vertical-align: middle;
    cursor: pointer;
    margin-left: 10px;
    margin-right: 10px;
  }
  .ipt{
    width: 300px;
  }
  .btn_prev{
     /*margin-left: 40px;*/
   }
.table{
    margin-left: 50px;
    margin-top: 50px;
    width:600px;
  }
  .btn_box{
    width: 100%;
    text-align: center;
  }
  .step_text{
    display: inline-block;
    width: 60px;
    font-size:14px;
  }
  .step_text>.el-input__inner{
    padding: 0 !important;
    text-align: center !important;
  }
</style>
