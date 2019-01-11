<template>
  <div class="container">
    <el-form label-position="right" label-width="80px"  class="form" >
      <el-form-item class="food_title_box">
        <span class="food_title">添加调料</span>
      </el-form-item>
      <el-form-item label="菜谱名" >
        <span>{{ this.cookbookname}}</span>
        <!--<el-col :span="12">-->
          <!--&lt;!&ndash;<el-autocomplete&ndash;&gt;-->
            <!--&lt;!&ndash;class="inline-input"&ndash;&gt;-->
            <!--&lt;!&ndash;v-model="state1"&ndash;&gt;-->
            <!--&lt;!&ndash;:fetch-suggestions="querySearch"&ndash;&gt;-->
            <!--&lt;!&ndash;placeholder="请输入内容"&ndash;&gt;-->
            <!--&lt;!&ndash;@select="handleSelect1"&ndash;&gt;-->
            <!--&lt;!&ndash;:disabled="readonlyShow"&ndash;&gt;-->
          <!--&lt;!&ndash;&gt;</el-autocomplete>&ndash;&gt;-->
          <!---->
        <!--</el-col>-->
      </el-form-item>

      <el-form-item label="添加调料" >
        <!--<el-input v-model="data.foodname" class="ipt"></el-input>-->
        <el-autocomplete
          v-model="search"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入搜索内容"
          @select="handleSelect"
          class="search_ipt2"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="重量">
        <el-input class="weight_ipt" v-model.trim="data[0].weight"></el-input>

      </el-form-item>

      <el-form-item label="单位">
        <el-input v-model.trim="data[0].unit" class="ipt"></el-input>
        <span>（/克）</span>
      </el-form-item>
      <el-form-item label="描述">
        <el-input   v-model.trim="data[0].description" class="describe_ipt">
        </el-input>
        <span>（/勺）</span>
      </el-form-item>
      <div class="btn_box">
        <el-button style="margin-top: 12px;" type="primary" @click="prevSetp" >上一步</el-button>
        <el-button style="margin-top: 12px;" @click="next(data[0].cookbookid,data[0].description,data[0].condimentid,data[0].condimentname,data[0].unit,data[0].weight)" type="primary" class="successbtn" >添加调料</el-button>
        <!--<el-button style="margin-top: 12px;" type="primary" @click="nextSetp" :disabled="this.showsubmitBtn">提交</el-button>-->
        <el-button style="margin-top: 12px;" type="primary" @click="nextSetp1" >跳过此步</el-button>
        <!--<el-button  style="margin-top: 12px;" type="primary" v-show="dataArr.length>6">完成</el-button>-->
      </div>
    </el-form>

    <table class="layui-table table" >
      <thead>
      <tr>
        <th>调料名</th>
        <th>重量</th>
        <th>单位</th>
        <th>日期</th>
        <th>描述</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,key) in dataArr">
        <td>{{item.condimentname}}</td>
        <td>{{item.weight}}</td>
        <td>{{item.unit}}</td>
        <td>{{item.createtime}}</td>
        <td>{{item.description}}</td>
        <td>
          <a class="layui-btn layui-btn-danger layui-btn-xs" @click="remove(item,key)">删除</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import {delbookcondiment,getbookcondiment,searchcondiment,condiment,getall,getcount,seasoning,condimentcount} from  "../../api";
  export default {
    name: "step3addfood",
    data() {
      return {
        search:'',//辅料
        // search1:'',
        //单个食材对象
        data: [{
          cookbookid: '', //菜谱id
          description: '', //描述
          condimentid: '',//调料ID
          condimentname: '',//调料名
          unit: '',//单位
          weight: ''//重量

        }],
        restaurants:[],//搜索框全部调料
        condimentlist:[],//材料列表
        cookbookname:'',//菜谱名
        dataArr:[],//存储所有调料的数组
        total:'',//调料总数
        count:0,//获取菜谱总数
        // restaurants: [  { "value": "暂无数据" },],

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
      this.data[0].cookbookid=this.obj.cookbookid;
      //获取当前菜谱已有调料步骤
      getbookcondiment(this.data[0].cookbookid).then(res=>{
        this.dataArr=res.data||[];
      })
    },
    methods:{
      //获取页面的调料数据
      loadAll(){
        let that=this;
        //获取总条数
        condimentcount(1).then(res=>{
          this.total = res.data;
          if(res.code===200){
            condiment(1,this.total).then(res=>{
              this.condimentlist = res.data;
              this.condimentlist.forEach((v,k,a)=>{
                let obj={};
                obj.value=v.condimentname;
                obj.condimentid= v.condimentid;
                obj.condimentname=v.condimentname;
                obj.condimenttype=v.condimenttype;
                obj.createtime=v.createtime;
                obj.deletestate=v.deletestate;
                that.restaurants.push(obj);
              })
            })
          }
        })
        return that.restaurants
      },

      //搜索获取调料
      querySearchAsync(queryString,cb){
        var  list=[{}];
        searchcondiment(queryString).then(res=>{
          //   this.restaurants = res.data
          for(let i of res.data){
            i.value = i.condimentname
          }
          this.condimentlist = res.data;
          list= res.data;
          cb(list)
        }).catch((error)=>{
          // list=[{value:'暂无数据'}];
          this.restaurants?list=this.restaurants:list=[{value:'暂无数据'}];
          cb(list);
          //获取已有调料
          condiment(this.present,this.sizes).then(res=>{
            this.condimentlist = res.data
          })
        });
      },
      //点击获取到的食材取到当前调料的id 和 name
      handleSelect(item) {
        this.data[0].condimentid=item.condimentid;
        this.data[0].condimentname=item.condimentname;
        (item.value==='暂无数据')&&(this.search='');
      },


      //点击添加食材 进行验证
      next(cookbookid,description,condimentid,condimentname ,unit,weight){
        let reg=/^[0-9]+.?[0-9]*$/;
        if(weight===''){
          weight='0';
        }
        if(cookbookid===''||condimentid===''||condimentname===''){
          this.$alert('调料不能为空', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          })
        }else if(!reg.test(cookbookid)||!reg.test(condimentid)){
          this.$alert('id必须为数字', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          })
        }
        else{
          //将得到的调料信息存储在data数组里面
          this.data[0].weight=weight;
          this.data[0].unit=unit;
          this.data[0].condimentid=parseInt(this.data[0].condimentid);
          this.data[0].condimentname=condimentname;
          this.data[0].cookbookid=parseInt(this.data[0].cookbookid);
          this.data[0].description=description;
          // this.data[0].weight=parseFloat(this.data[0].weight);
          console.log(this.data);
          seasoning(this.data)
            .then(res=>{
              // this.data.cookbookid= '';
              //添加成功后清空data数组里面的值
              this.data[0].description= '';
              this.data[0].condimentid= '';
              this.data[0].condimentname= '';
              this.data[0].unit='';
              this.data[0].weight= '';
              this.search='';
              this.dataArr = [];
              let that=this;
              //重新拉取食材数据刷新
              getbookcondiment(this.data[0].cookbookid).then(res=>{
                this.dataArr=res.data||[];
                this.$message({
                  message: '添加成功！点跳过此步骤进入下一步',
                  type: 'success',
                  duration:1000,
                  center: true
                });
              })
            })
        }
      },
      //点击跳过此步按钮跳转到辅料页面
      nextSetp1(){
        this.$router.push({
          path:'/step4addfood',
          query:{
            flag:true,
          }
        })
        this.$bus.$emit('nextgo',4)
      },
      //上一步按钮事件
      prevSetp(){
        //跳转到上一页 食材步骤页
        this.$router.push({
          path:'/step2addfood',
          query:{
            flag:true,
          }
        })
        this.$bus.$emit('prevgo',2)
      },
      //表格删除事件按钮
      remove(item,key){
        let that=this;
        //请求删除当前点击的这条数据
        delbookcondiment(item.bcid).then(res=>{
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
      }
    },
    mounted(){
      this.loadAll();
      // let that=this;
      // getcount(1).then(res=>{
      //   this.count = res.data;
      //   getall(1,this.count).then(res=>{
      //     let list=[];
      //     that.getdata = res.data;
      //     that.getdata.forEach(function (v,k,a) {
      //       let obj={};
      //       obj.value=v.cbname;
      //       obj.cookbookid=v.cookbookid;
      //       list.push(obj);
      //     })
      //     // this.restaurants = list;
      //   });
      // });
    }
  }
</script>

<style scoped>
  .form,.form_first{
    margin-top: 50px;
    width:500px;
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
    margin-left: 50px;
    margin-top: 50px;
    width:600px;
  }
</style>
