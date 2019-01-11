<template>
   <div class="container" >
     <el-form label-position="right" label-width="80px"  class="form" >
       <el-form-item class="food_title_box">
         <span class="food_title">添加所需食材</span>
       </el-form-item>
       <el-form-item label="菜谱名">
         <span>{{this.cookbookname}}</span>
       </el-form-item>
       <el-form-item label="添加食材" >
         <el-autocomplete class="search_ipt2"
           v-model="search"
           :fetch-suggestions="querySearchAsync"
           placeholder="请输入搜索内容"
           @select="handleSelect"

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
         <el-button style="margin-top: 12px;" @click="next(data[0].cookbookid,data[0].description,data[0].foodid,data[0].foodname,data[0].unit,data[0].weight)" type="primary" class="successbtn" >添加食材</el-button>
         <el-button style="margin-top: 12px;" type="primary" @click="nextSetp1">跳过此步</el-button>
       </div>
     </el-form>
     <table class="layui-table table" >
       <thead>
          <tr>
            <th>食材名</th>
            <th>重量</th>
            <th>单位</th>
            <th>日期</th>
            <th>描述</th>
            <th>操作</th>
          </tr>
       </thead>
       <tbody>
       <tr v-for="(item,key) in dataArr">
           <td>{{item.foodname}}</td>
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
  import {getbookfood,addfoods,getfoods,search,getall,getcount,delbookfood,foodcount} from  "../../api";
    export default {
        name: "step1addfood",
      data() {
        return {
          //搜索食材的值
          search:'',
         //存储单个食材对象
          data: [{
            //菜谱id
            cookbookid: '',
            //描述
            description: '',
            //食材id
            foodid: '',
            //食材名
            foodname: '',
            //单位
            unit: '',
            //重量
            weight: '',
          }],

          foodlist:[],//食材列表
          //搜索聚焦获取所有食材
          restaurants:[],
          //获取到的菜谱名
          cookbookname:'',
          //存储所有食材的数组,
          dataArr:[],
          //存储所有菜谱
          // getdata:[],

          //获取菜谱总数
          count:0,
          //食材总数
          total:0,

          // restaurants: [{ "value": "暂无数据" },],

          //存储本地缓存传过来的cookbookid cookbookname
          obj:{}

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
          //获取当前菜谱已有食材步骤
        getbookfood(this.data[0].cookbookid).then(res=>{
          this.dataArr=res.data||[];
        })
      },
      methods:{
        //获取食材列表
        loadAll(){
          let that=this;
          foodcount(1).then(res=>{
            if(res.code===200){
              this.total = res.data;
              getfoods(1,this.total).then(res=>{
                that.foodlist = res.data;
                // console.log(res.data);
                that.foodlist.forEach((v,k,a)=>{
                  let obj={};
                  obj.value=v.foodname;
                  obj.foodid=v.foodid;
                  obj.createtime= v.createtime;
                  obj.deletestate= v.deletestate;
                  obj.foodname=v.foodname;
                  obj.foodtype=v.foodtype;
                  that.restaurants.push(obj);
                });
              })
            }
          });
          return that.restaurants;
        },
          //搜索获取食材
        querySearchAsync(queryString,cb) {
          var  list=[{}];
          console.log(list);
          search(queryString).then(res=>{
            //   this.restaurants = res.data
            for(let i of res.data){
              i.value = i.foodname
            }
            this.foodlist = res.data;
            list= res.data;
            cb(list)
          }).catch((error)=>{
            this.restaurants?list=this.restaurants:list=[{value:'暂无数据'}];
            cb(list);
            //获取已有食材
            getfoods(this.present,this.sizes).then(res=>{
              this.foodlist = res.data
            })
          });
        },


        //点击获取到的食材取到当前食材的id 和 name
        handleSelect(item) {
          console.log(item);
         this.data[0].foodid=item.foodid;
          item.value?(this.data[0].foodname=item.value):(this.data[0].foodname=item.foodname);
         console.log(this.data[0]);
          (item.value==='暂无数据')&&(this.search='');
        },
        //点击添加食材 进行验证
          next(cookbookid,description,foodid,foodname,unit,weight){
          if(weight===''){
            weight='0';
          }
          // console.log(unit,description)
            let reg=/^[0-9]+.?[0-9]*$/;
            if(cookbookid===''||foodid===''||foodname===''){
              this.$alert('食材不能为空', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
              })
            }else if(!reg.test(cookbookid)||!reg.test(foodid)){
              this.$alert('id为数字', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
              })
            }
            else{

              // let nowdata=JSON.parse(JSON.stringify(this.data));
              //将得到的食材信息存储在data数组里面
              //食材重量
              this.data[0].weight=weight;
              //食材单位
              this.data[0].unit=unit;
              //食材描述
              this.data[0].description=description;
              //食材名
              this.data[0].foodname=foodname;
              //菜谱id 转换成int数字类型
              this.data[0].cookbookid=parseInt(this.data[0].cookbookid);
              //食材id 转换成int数字类型
              this.data[0].foodid=parseInt(this.data[0].foodid);
              // //食材单位 转换成浮点类型小数保留一位,若保留两位用x=x.toFixed(2);
              // this.data[0].weight=parseFloat(this.data[0].weight);
             // 得到的data数组发添加食材请求
              console.log(this.data);
              addfoods(this.data)
                .then(res=>{
                  if(res.code===200){
                    // this.data.cookbookid= '';
                    //添加成功后清空data数组里面的值
                    this.data[0].description= '';
                    this.data[0].foodid= '';
                    this.data[0].foodname= '';
                    this.data[0].unit='';
                    this.data[0].weight= '';
                    this.search='';
                    this.dataArr=[];
                    let that=this;
                    //重新拉取食材数据刷新
                    getbookfood(this.data[0].cookbookid).then(res=>{
                      this.dataArr=res.data||[];
                      // console.log(this.dataArr);
                      this.$message({
                        message: '添加成功！点跳过此步骤进入下一步',
                        type: 'success',
                        duration:1000,
                        center: true
                      });

                    });
                  }
                });
            }
          },
        //上一步按钮事件
        prevSetp(){
          // this.$bus.$emit('prevgo1',true);
          //跳转到上一页 菜谱列表页
          this.$router.push({
            path:'/countStepview',
            query:{
              flag:true,
            }
          })
          this.$bus.$emit('prevgo',0)
          // window.sessionStorage.setItem('pageval',0);
        },
        //表格删除事件按钮
        remove(item,key){
          let that=this;
          //请求删除当前点击的这条数据
          delbookfood(item.bfid).then(res=>{
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
        //跳过此步骤按钮事件
        nextSetp1(){
          //跳转到添加辅料页
          this.$router.push({
            path:'/step2addfood',
            query:{
              flag:true,
            }
          });
          this.$bus.$emit('nextgo',2)
          // window.sessionStorage.setItem('pageval',2);
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
        //        obj.value=v.cbname;
        //        obj.cookbookid=v.cookbookid;
        //        list.push(obj);
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
  width:800px;
}
/*.search_ipt1{*/
  /*display: inline-block;*/
  /*width: 100%;*/
/*}*/

.cookbook{
  display: inline-block;
  vertical-align: middle;
  width: 300px;
}
.el-icon-circle-plus{
  font-size: 30px;
}
.el-icon-circle-plus{
  vertical-align: middle;
  position: relative;
}
.icon_box{
  display: inline-block;
  vertical-align: middle;
}
  /*.text{*/
    /*display: inline-block;*/
  /*}*/
</style>
