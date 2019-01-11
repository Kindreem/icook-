<template>
  <div class="container">
    <el-form label-position="right" label-width="80px"  class="form" >
      <el-form-item class="food_title_box">
        <span class="food_title">添加所需辅料</span>
      </el-form-item>
      <el-form-item label="菜谱名" >
        <!--<el-col :span="12" >-->
          <!--<el-autocomplete-->
            <!--class="inline-input"-->
            <!--v-model="state1"-->
            <!--:fetch-suggestions="querySearch"-->
            <!--placeholder="请输入内容"-->
            <!--@select="handleSelect1"-->
            <!--:disabled="readonlyShow"-->
          <!--&gt;</el-autocomplete>-->
        <!--</el-col>-->
        <span>{{this.cookbookname}}</span>
      </el-form-item>
        <!--<tr>-->
          <!--<th>菜谱名</th>-->
          <!--<th>流派</th>-->
          <!--<th>操作</th>-->
        <!--</tr>-->

      <el-form-item label="添加辅料" >
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
        <!--<el-button style="margin-top: 12px;" type="primary" @click="prevSetp">上一步未完成</el-button>-->
        <el-button style="margin-top: 12px;" type="primary" @click="prevSetp" >上一步</el-button>
        <el-button style="margin-top: 12px;" @click="next(data[0].cookbookid,data[0].description,data[0].excipientsid,data[0].excipientsname,data[0].unit,data[0].weight)" type="primary" class="successbtn" >添加辅料</el-button>
        <!--<el-button style="margin-top: 12px;" type="primary" @click="nextSetp" v-if="(this.$store.state.datafoodArr2!==undefined&&this.$store.state.datafoodArr2.length>0)">添加下一步</el-button>-->
        <!--<el-button style="margin-top: 12px;" type="primary" @click="nextSetp" :disabled="this.showsubmitBtn">提交</el-button>-->
        <el-button style="margin-top: 12px;" type="primary" @click="nextSetp1" >跳过此步</el-button>
        <!--<el-button  style="margin-top: 12px;" type="primary" v-show="dataArr.length>6">完成</el-button>-->
      </div>
    </el-form>
    <table class="layui-table table" >
      <thead>
      <tr>
        <th>辅料名</th>
        <th>重量</th>
        <th>单位</th>
        <th>日期</th>
        <th>描述</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,key) in dataArr">
        <td>{{item.excipientsname}}</td>
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
  import {delbookexcipients,getbookexcipients,searchexcipients,excipients,getall,getcount,accessories,excipientscount} from  "../../api";
  export default {
    name: "step1addfood",
    data() {
      return {
        search:'',//辅料
        // search1:'',
        //单个食材对象
        data: [{
          cookbookid: '', //菜谱id
          description: '', //描述
          excipientsid: '',//辅料ID
          excipientsname: '',//辅料名
          unit: '',//单位
          weight: ''//重量
        }],
        //获取到的菜谱名
        cookbookname:'',
        dataArr:[],//存储所有辅料的数组
        total:[],//辅料总条数
        count:0,//获取菜谱总数
        excipientslist:[],//辅料列表
        restaurants:[],//搜索框辅料列表
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
      // this.dataArr=this.$store.state.datafoodArr2||[];
      //获取当前菜谱已有辅料步骤
      getbookexcipients(this.data[0].cookbookid).then(res=>{
        this.dataArr=res.data||[];
      })
    },
    methods:{
      //获取页面辅料数据
      loadAll(){
        let that=this;
        //获取总数
        excipientscount(1).then(res=>{
          if(res.code===200){
            this.total = res.data;
            //获取辅料列表
            excipients(1,this.total).then(res=>{
              this.excipientslist = res.data;
              console.log(this.excipientslist);
              this.excipientslist.forEach((v,k,a)=>{
                let obj={};
                obj.value=v.excipientsname;
                obj.createtime= v.createtime;
                obj.deletestate= v.deletestate
                obj.excipientsid=v.excipientsid;
                obj.excipientsname=v.excipientsname;
                that.restaurants.push(obj);
              })
            })
          }
        });
        return that.restaurants;
      },

      //搜索获取辅料
      querySearchAsync(queryString,cb) {
        var  list=[{}];
        searchexcipients(queryString).then(res=>{
          //   this.restaurants = res.data
          for(let i of res.data){
            i.value = i.excipientsname
          }
          this.excipientslist = res.data;
          list= res.data;
          cb(list)
        }).catch((error)=>{
          this.restaurants?list=this.restaurants:list=[{value:'暂无数据'}];
          cb(list)
          //获取已有辅料
          excipients(this.present,this.sizes).then(res=>{
            this.excipientslist = res.data
          })
        });
      },
      //点击获取到的辅料取到当前辅料的id 和 name
      handleSelect(item) {
        this.data[0].excipientsid=item.excipientsid;
        this.data[0].excipientsname=item.excipientsname;
        (item.value==='暂无数据')&&(this.search='');
      },
      //点击添加辅料进行验证
      next(cookbookid,description,excipientsid,excipientsname ,unit,weight){
        let reg=/^[0-9]+.?[0-9]*$/;
        if(weight===''){
          weight='0';
        }
        if(cookbookid===''||excipientsid===''||excipientsname===''){
          this.$alert('辅料不能为空', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          })
        }else if(!reg.test(cookbookid)||!reg.test(excipientsid)){
          this.$alert('重量必须为数字', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          })
        }
        else{
          //将得到的辅料信息存储在data数组里面
          this.data[0].weight=weight;
          this.data[0].unit=unit;
          this.data[0].description=description;
          this.data[0].excipientsname=excipientsname;
          this.data[0].cookbookid=parseInt(this.data[0].cookbookid);
          this.data[0].excipientsid=parseInt(this.data[0].excipientsid);
          // this.data[0].weight=parseFloat(this.data[0].weight);
      console.log(this.data);
          accessories( this.data)
            .then(res=>{
              if(res.code===200){
                //添加成功后清空data数组里面的值
                // this.data.cookbookid= '';
                this.data[0].description= '';
                this.data[0].excipientsid= '';
                this.data[0].excipientsname= '';
                this.data[0].unit='';
                this.data[0].weight= '';
                this.search='';
                this.dataArr = [];
                let that=this;
                //重新拉取辅料数据刷新
                getbookexcipients(this.data[0].cookbookid).then(res=>{
                  this.dataArr=res.data||[];
                  // console.log(this.dataArr);
                  this.$message({
                    message: '添加成功！点跳过此步骤进入下一步',
                    type: 'success',
                    duration:1000,
                    center: true
                  });
                })
              }
            })
        }
      },
      //表格删除事件按钮
      remove(item,key){
        // console.log(item);
        let that=this;
        //请求删除当前点击的这条数据
        delbookexcipients(item.beid).then(res=>{
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
      //上一步按钮事件
      prevSetp(){
        // this.$bus.$emit('prevgo1',true);
        //跳转到上一页 食材页
        this.$router.push({
          path:'/step1addfood',
          query:{
            flag:true,
          }
        })
        this.$bus.$emit('prevgo',1)
      },
      //跳过此步骤按钮事件
      nextSetp1(){
        //跳转到添加辅料页
        this.$router.push({
          path:'/step3addfood',
          query:{
            flag:true,
          }
        })
        this.$bus.$emit('nextgo',3)
      },

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
