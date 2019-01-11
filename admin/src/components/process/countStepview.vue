<template>
  <div class="container_box">
    <div class="layui-form">
      <table class="layui-table" >
        <thead>
        <tr>
          <th>菜谱名</th>
          <th>流派</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,key) in arr">
          <td>
          {{item.cbname}}
          </td>
          <td>
            {{item.factionsid==1?'川':item.factionsid==2?'鲁':item.factionsid==3?'粤':item.factionsid==4?'闽':item.factionsid==5?'苏':item.factionsid==6?'浙':item.factionsid==7?'湘':item.factionsid==8?'徽':'家常'}}
          </td>
          <td>
            <a class="layui-btn layui-btn-primary layui-btn-xs" @click="detail(item,key)">查看</a>
            <a class="layui-btn  layui-btn-xs edit_btn" v-show="item.status!==0" @click="add(item)">编辑</a>
            <a class="layui-btn layui-btn-xs" v-show="item.status===0" @click="add(item)">添加</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[10, 15, 20]"
      :page-size="countnum"
      layout="total, sizes, prev, pager, next, jumper"
      :total="countdata">
    </el-pagination>
    <el-dialog   :title="title"  :modal-append-to-body = "false"  class="con_box" :visible.sync="dialogFormVisible">
        <el-form>
          <div v-show="this.flag">
            <span class="not_stepfood_text">该菜谱暂无步骤,或步骤已被删除...</span>
            <span slot="footer" class="dialog-footer dialog-footer-now">
              <el-button @click="dialogFormVisible = false" class="dialog_cancel">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false" class="dialog_submit">确 定</el-button>
            </span>
          </div>
          <div class="dialog_container">
            <div class="header" v-show="datafoodstep.sysBookFoodVOlist!==''">
              <!--<span class="header_tilt_cookbookname">{{this.$_store.get('data','object')[1]}}</span>-->
              <div class="header_title" >
                <span>PAPT1食材准备</span>
              </div>
            </div>
            <div class="main" >
              <div class="main_first_step_content" v-show="datafoodstep.sysBookFoodVOlist!==''">
                <div class="main_title_box" >
                  <div class="main_title_big_box">
                    <span class="main_title_squre"></span>
                    <span class="main_title_text">
                      <i class="el-icon-star-on icon_star"></i>
                      食材
                    </span>
                  </div>
                </div>
                <div class="main_first_step" v-for="(item,key) in datafoodstep.sysBookFoodVOlist" :class="{'block':showTopBlock(datafoodstep.sysBookFoodVOlist,item,key)&&key===0}">
                  <div class="main_first_step_box" >
                    <span class="main_first_step_text">{{item.foodname}}</span>
                    <span class="main_first_step_text" v-show="item.weight!=0">{{item.weight}}</span>
                    <span class="main_first_step_text" v-show="(item.weight!=0)&&(item.unit!==''||item.unit!==' '||item.unit!=='  ')">{{item.unit}}</span>
                    <span class="main_first_step_text" v-show="item.weight==0||item.unit===''||item.unit===' '||item.unit==='  '">{{item.description}}</span>
                    <span v-show="(item.weight==0)&&(item.unit===''||item.unit===' ')&&(item.description===''||item.description===' ')">适量</span>
                  </div>
                </div>
              </div>
              <div class="main_second_step_content" v-show="datafoodstep.sysBookExcipientsVOlist!==''">
                <div class="main_title_box" >
                  <div class="main_title_big_box">
                    <span class="main_title_squre"></span>
                    <span class="main_title_text">
                      <i class="el-icon-star-on icon_star"></i>
                    辅料
                  </span>
                  </div>
                </div>
                <div class="main_first_step" v-for="(item,key) in datafoodstep.sysBookExcipientsVOlist" :class="{'block':showTopBlock(datafoodstep.sysBookExcipientsVOlist,item,key)&&key===0}">
                  <div class="main_first_step_box" >
                    <span class="main_first_step_text">{{item.excipientsname}}</span>
                    <span class="main_first_step_text" v-show="item.weight!=0">{{item.weight}}</span>
                    <span class="main_first_step_text" v-show="(item.weight!=0)&&(item.unit!==''||item.unit!==' '||item.unit!=='  ')">{{item.unit}}</span>
                    <span class="main_first_step_text" v-show="item.weight==0||item.unit===''||item.unit===' '||item.unit==='  '">{{item.description}}</span>
                    <span v-show="(item.weight==0)&&(item.unit===''||item.unit===' ')&&(item.description===''||item.description===' ')">适量</span>
                  </div>
                </div>
              </div>
              <div class="main_second_step_content" v-show="datafoodstep.sysBookCondimentVOlist!==''">
                <div class="main_title_box" >
                  <div class="main_title_big_box">
                    <span class="main_title_squre"></span>
                    <span class="main_title_text">
                      <i class="el-icon-star-on icon_star"></i>
                    调料
                  </span>
                  </div>
                </div>
                <div class="main_first_step" v-for="(item,key) in datafoodstep.sysBookCondimentVOlist" :class="{'block':showTopBlock(datafoodstep.sysBookCondimentVOlist,item,key)&&key===0}">
                  <div class="main_first_step_box main_second_step_box" >
                    <span class="main_first_step_text">{{item.condimentname||''}}</span>
                    <span class="main_first_step_text" v-show="item.weight!=0">{{item.weight}}</span>
                    <span class="main_first_step_text" v-show="(item.weight!=0)&&(item.unit!==''||item.unit!==' '||item.unit!=='  ')">{{item.unit}}</span>
                    <span class="main_first_step_text" v-show="item.weight==0||item.unit===''||item.unit===' '||item.unit==='  '">{{item.description}}</span>
                    <span v-show="(item.weight==0)&&(item.unit===''||item.unit===' ')&&(item.description===''||item.description===' ')">适量</span>
                  </div>
                </div>
              </div>
              <div class="header_title" v-show="datafoodstep.sysBookHandlingVOlist!==''">
                <span>PAPT2食材处理</span>
              </div>
              <div class="main_second_step_content" v-show="datafoodstep.sysBookHandlingVOlist!==''">
                <div class="main_title_box" >
                  <div class="main_title_big_box">
                    <span class="main_title_squre"></span>
                    <span class="main_title_text">
                      <i class="el-icon-star-on icon_star"></i>
                    食材加工
                  </span>
                  </div>
                </div>
                <div class="main_first_step "  v-for="(item,key) in datafoodstep.sysBookHandlingVOlist" :class="{'block':showbigboxNow(datafoodstep.sysBookHandlingVOlist,item)&&key===0,'bigboxAdd':maxbox(item.handlinglength,item.handlingname)}">
                  <div class=" main_first_step_text_box " :class="{'bigbox':maxbox(item.handlinglength)}" >
                    <div class="main_first_step_box main_second_step_box  "  :class="{'bigbox':maxbox(item.handlinglength,item.handlingname)}" >
                      <span class="main_first_step_text">{{item.name}}</span>
                      <!--<span class="main_first_step_text " :class="{'main_first_step_text bigboxtext':maxbox(item.handlinglength,item.handlingname)}" >{{item.handlingname}}</span>-->
                      <span v-if="!maxbox(item.handlinglength,item.handlingname)" class="main_first_step_text ">{{item.handlingname}}</span>
                        <div class="box_line" v-if="maxbox(item.handlinglength,item.handlingname)">
                          <p class="box_line_p" v-for="i in item.handlingname.split('。')" v-if="i!=''"  >
                            <span class="box_line_text" >{{i}}。</span>
                          </p>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="header_title" v-show="datafoodstep.sysBookCookingVOlist!==''">
                <span>PAPT3食材烹饪</span>
              </div>
              <div class="main_second_step_content main_second_step_content1" v-show="datafoodstep.sysBookCookingVOlist!==''">
                <div class="main_title_box main_title_five_box" >
                  <div class="main_title_big_box">
                    <span class="main_title_squre"></span>
                    <span class="main_title_text">
                      <i class="el-icon-star-on icon_star"></i>
                    食材烹饪
                  </span>
                  </div>
                </div>
                <div class="main_five_step_box" v-for="(item,key) in datafoodstep.sysBookCookingVOlist" >
                  <div class="main_five_step" >
                    <span class="main_five_step_left_text" >{{item.step}}</span>
                    <span class="main_five_step_content_text" :style="{background: color()}">{{item.description.substring(0,item.description.indexOf("$"))}}</span>
                    <span class="line"></span>
                    <span class="main_five_step_right_text">
                    <span>
                      {{item.description.substring(item.description.indexOf("$")+1)}}
                    </span>
                  </span>
                  </div>
                </div>
               <div class="complete_btn_box">
                  <span class="complete_btn" @click="jumppage">
                  烹饪完成
                </span>
               </div>
                <div class="circular_box"></div>
              </div>
              <div class="header_title" v-show="datafoodstep.sysBookTrayVOlist!==''">
                <span>PAPT3食材装盘</span>
              </div>
              <div class="main_second_step_content main_second_step_content1" v-show="datafoodstep.sysBookTrayVOlist!==''">
                <div class="main_title_box main_title_five_box" >
                  <div class="main_title_big_box">
                    <span class="main_title_squre"></span>
                    <span class="main_title_text">
                      <i class="el-icon-star-on icon_star"></i>
                    食材装盘
                  </span>
                  </div>
                </div>
                <div class="main_five_step_box" v-for="(item,key) in datafoodstep.sysBookTrayVOlist" >
                  <div class="main_five_step" >
                    <span class="main_five_step_left_text" >{{item.step}}</span>
                    <span class="main_five_step_content_text" :style="{background: color()}">{{item.description.substring(0,item.description.indexOf("$"))}}</span>
                    <span class="line"></span>
                    <span class="main_five_step_right_text">
                    <span>
                      {{item.description.substring(item.description.indexOf("$")+1)}}
                    </span>
                  </span>
                  </div>
                </div>
                <div class="circular_box"></div>
                <div class="complete_btn_box">
                  <span class="complete_btn" @click="jumppage">
                  摆盘完成
                </span>
                </div>
              </div>
            </div>
          </div>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>

  import {getprocessalls,getcount,getbookprocess} from "../../api";

  export default {
    name: "countStepview",
    data(){
      return {
        pageIndex: 1,//当前页面页码
        countnum: 10,//当前页面显示条数
        pagesizeArr:[ 10, 15, 20], //页面选择条数
        clientHeight:'',//获取屏幕总高度
        scrollObj:'',//div元素滚动的区域
        scrollTop:'',//div到头部的距离
        scrollHeight:'',//滚动条的总高度
        flag:false,//判断菜谱是否存在或被删除,用来显示隐藏"菜谱已被删除"
        countdata:this.pageIndex+1,//总页数
        arr:[],//存储获取到的菜谱
        dialogFormVisible: false,//控制查看详情页的显示和隐藏
        datafoodstep:{},//获取菜谱所有步骤
        bgcolor:'',//烹饪方块背景颜色
        title:'',//查看菜谱标题
      };
    },
    created(){
      this.arr=[];
    },
    computed:{

    },
    mounted(){
      //添加屏幕滚动事件
      window.addEventListener('scroll', this.handleScroll, true);

      //获取页面数据,及显示条数
      if(window.sessionStorage.length!==0){
        window.sessionStorage.pageIndex? (this.pageIndex=parseInt(window.sessionStorage.pageIndex)):1;
        window.sessionStorage.countnum? (this.countnum=parseInt(window.sessionStorage.countnum)):10;
      }
      else{
        this.pageIndex=1;
        this.countnum=10;
      }
      //刷新页面菜谱及条数
      this.getprocessall();
    },
    methods:{
      //数组为奇数的时候方块第一个为块元素
      showTopBlock(arr,item,key){
         if(arr&&(arr.length%2===1)){
           return true

       }


      },
      //如果为大方块就让数组长度加1
      showbigboxNow(arr,item){
       if(arr){
         let i=0;
         arr.forEach((v,k,a)=>{
           if(v.handlinglength=='1'){
             i++;
           }
         })
         let l=arr.length+i;
         if(l%2===1){
           return true
         }
       }
      },
      //让现实的方块变大
      maxbox(val,handlingname){
        if(val&&val=="1"){
          return true;
        }
      },
      //获取官方菜谱
     getprocessall(){
       getprocessalls(this.pageIndex,this.countnum).then(
         res=>{
           this.arr=res.data;
         }
       );
       //获取菜谱条数
       getcount(1).then(res=>{
         this.countdata=res.data;
       })
     },
      //屏幕滚动
      handleScroll(){
        // this.scroll =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        // 设备可见屏幕高度
        this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

        // 滚动区域为整个dialog
        this.scrollObj = document.getElementsByClassName('con_box')[0];

        // div 到头部的距离
        // this.scrollTop = this.scrollObj.scrollTop||0;

        // 滚动条的总高度
        // this.scrollHeight = this.scrollObj.scrollHeight;

      },
      //分页 显示条数
      handleSizeChange(val) {
        this.countnum=val;
        //点击条数重新发请求获取菜谱数据
        getprocessalls(this.pageIndex,this.countnum).then(
          res=>{
            if(res.code===200){
              this.arr=res.data;
              //sessionStorage存储当前分页选中的条数
              window.sessionStorage.setItem('countnum', val);
            }
          }
        );

      },
      //分页 显示当前页码
      handleCurrentChange(val) {
        this.pageIndex=val;
        //点击页码重新发请求获取菜谱数据
        getprocessalls(this.pageIndex,this.countnum).then(
          res=>{
            if(res.code===200){
              this.arr=res.data;
              //sessionStorage存储当前分页选中的页面
              window.sessionStorage.setItem('pageIndex', val);
            }
          })

      },
      //点击编辑菜谱按钮
      add(i){
       //定义一个空对象存储每点一次得到的当前项的cookbookid,cookbookname
      let obj={};
      obj.cookbookid=i.cookbookid;
      obj.cookbookname=i.cbname;
      //将存储过后的对象存在本地缓存localstrong里
        this.$_store.set('data',obj,'object');
      //编程式导航跳转到编辑食材页面
        this.$router.push({
        path:'/step1addfood',
        query:{
        }
      })
      },
      //点击查看菜谱详情
      detail(item,key){
        console.log(item)
        //将菜谱id及名称传入菜谱详情页面
        this.title=item.cbname;
        //通过菜谱id获取菜谱步骤
        getbookprocess(item.cookbookid).then
        (res=>{
          this.datafoodstep=res.data;
          // this.datafoodstep.sysBookHandlingVOlist=[{handlingname:"fassfdsafsdafffffffffffffffffffffffffffffffffffffffff"},{handlingname:"fassf"}];
          console.log(this.datafoodstep)
          //判断菜谱是否为空 如果为空 让他等于一个空对象 防止页面渲染出现问题
         if(this.datafoodstep===null){
           this.datafoodstep={};
           //不显示菜谱详情弹框
           this.dialogFormVisible=false;
           //弹出菜谱没有步骤弹框
           this.$alert('菜谱还没有步骤', '提示', {
             confirmButtonText: '确定',
             callback: action => {
             }
           });
         }
         //同时如果菜谱存在,菜谱对象里面的数组长度为0 或者为null的时候直接让它为 ''
         else if(this.datafoodstep){
           this.dialogFormVisible=true;
         if(((this.datafoodstep.sysBookCondimentVOlist instanceof Array)&&(this.datafoodstep.sysBookCondimentVOlist.length===0))||this.datafoodstep.sysBookCondimentVOlist===null){
           this.datafoodstep.sysBookCondimentVOlist=''
         }
          if(((this.datafoodstep.sysBookCookingVOlist instanceof Array)&&(this.datafoodstep.sysBookCookingVOlist.length===0))||(this.datafoodstep.sysBookCookingVOlist===null)){
            this.datafoodstep.sysBookCookingVOlist=''
          }
          if(((this.datafoodstep.sysBookExcipientsVOlist instanceof Array)&&(this.datafoodstep.sysBookExcipientsVOlist.length===0))||(this.datafoodstep.sysBookExcipientsVOlist===null)){
            this.datafoodstep.sysBookExcipientsVOlist=''
          }
          if(((this.datafoodstep.sysBookFoodVOlist instanceof Array)&&(this.datafoodstep.sysBookFoodVOlist.length===0))||(this.datafoodstep.sysBookFoodVOlist===null)){
            this.datafoodstep.sysBookFoodVOlist=''
          }
          if(((this.datafoodstep.sysBookHandlingVOlist instanceof Array)&&(this.datafoodstep.sysBookHandlingVOlist.length===0))||(this.datafoodstep.sysBookHandlingVOlist===null)){
            this.datafoodstep.sysBookHandlingVOlist=''
          }
          if(((this.datafoodstep.sysBookTrayVOlist instanceof Array)&&(this.datafoodstep.sysBookTrayVOlist.length===0))||(this.datafoodstep.sysBookTrayVOlist===null)){
            this.datafoodstep.sysBookTrayVOlist=''
          }
        }
        //如果datafoodstep对象里面都为''的
        if(this.datafoodstep.sysBookCondimentVOlist===''&&this.datafoodstep.sysBookCookingVOlist===''&&this.datafoodstep.sysBookExcipientsVOlist===''&&this.datafoodstep.sysBookFoodVOlist===''&&this.datafoodstep.sysBookHandlingVOlist===''&&this.datafoodstep.sysBookTrayVOlist===''){
           //步骤不存在已被删除,弹框显示
           this.flag=true;
         }
         else {
          this.flag=false;
        }
      });
      },
      color(){
        //食材烹饪,装盘 里面的方块 随机生成颜色
        let colorArr=['e3cc70','64573a','6b7b8d','b2250f','bdb7b7','a2c3e3','8d6272'];
        let index = Math.floor((Math.random()*colorArr.length));
        return '#'+colorArr[index];
      },
      //查看详情里面的dialog 烹饪完成 摆盘完成 按钮点击事件
      jumppage(){
       //点击关闭dialog
        this.dialogFormVisible=false;
        //让页面滚动条回到最上面
        this.scrollObj.scrollTop=0;
      }
    },
    watch:{

    },
    computed:{
      // maxArr(handlingname){
      //   return ['1','3','3'];
      // },
    }
  }
</script>

<style lang = "scss" >
  .container_box{
    width: 100%;
    height: 100%;
  }
  /*.con_box{*/
    /*width: 900px;*/
  /*}*/
  .lbe{
    display: block;
    text-align-last: left;
    line-height: 100%;
  }
  .edit_btn{
    background: #1E9FFF;
  }
  .con{
    text-align: center;
  }
  *{
    margin: 0;
    padding: 0;
  }
  .dialog_container{
    width: 100%;
    height: 100%;

  }
  .header_tilt_cookbookname{
    font-size: 17px;
    display: block;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color:#5db8e8 ;
  }
  .header_title{
    width: 100%;
    height: 60px;
    background:#5db8e8 ;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    font-size: 22px;
    color: #fff;
    line-height: 60px;
    box-sizing: border-box;
    padding-left: 15px;
  }
  .main{

  }
  .main_first_step_content,.main_second_step_content{
    /*overflow: hidden;*/
    text-align: center;
    width: 80%;
    margin: 40px auto 40px auto;
  }
  .main_second_step_content1{
    text-align: left;
  }

  .main_first_step_box{
    width: 233px;
    height: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    background: #5db8e8;
    color: #fff;
    display: table-cell;
    border-radius: 20px;
    text-align: center;
    vertical-align: middle;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
  }
  .main_first_step_text_box{
    display: inline-block;
  }
  .main_second_step_box{
    background: #2a6987;
  }

  .main_first_step_text{
    display:block;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:2;
    overflow: hidden;

  }
  .main_first_step{
    display: inline-block;
    margin-top: 20px;
    margin-left: 9%;
    vertical-align: middle;
  }
.main_first_step1{
  margin-left: 0;
}
  .main_title_box{
    display: block;
    text-align-last: left;
    text-align: center;
    height: 61px;
    position: relative;
  }
  .main_title_five_box::after{
    content: "";
    display: block;
    width: 80%;
    height: 90px;
    /*background: darkseagreen;*/
    background: #fff;
    position: absolute;
    bottom: -70px;
    z-index: 998;
    border-top-left-radius: 80px;
    border-top-right-radius: 80px;


  }

  .main_title_big_box{
    display: inline-block;
    width: 200px;
    height: 61px;
    position: absolute;
    left:-12%;
    font-size: 0;
    line-height: 0;
    z-index: 999;
    /*box-shadow: 14px 7px 15px 0 #c6c6c6;*/
  }
  .main_title_big_box::after{
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 40px solid transparent;
    border-top: 47px solid transparent;
    border-right: 200px solid #fff;
    -webkit-box-shadow: 4px 40px 25px 0 #C6C6CE;
    box-shadow: 14px 23px 21px 0 #C6C6CE;
    -webkit-transform: rotate(8deg);
    transform: rotate(6deg);
    position: absolute;
    top: 0;
    left: -2px;
    z-index: -1;

  }
  .main_title_text{
    display: inline-block;
    width: 160px;
    height: 61px;
    vertical-align: middle;
    background:#fef9a2 ;
    font-size: 18px;
    line-height: 61px;
    color: #705a40;
  }
  .main_title_squre{
    display: inline-block;
    vertical-align: middle;
    width: 40px;
    height: 61px;
    background:#f6e996 ;
  }
  .icon_star{
    color: #594230;
    margin-left: 15px;
    margin-right: 10px;
    font-size: 25px;
  }
  /*.main_second_step_content_five{*/
  /*overflow: hidden;*/
  /*}*/
  .main_five_step{
    width: 100%;
    text-align-last: justify;
    margin: 70px auto 0 auto;
  }
  .main_five_step_left_text{
    width: 45px;
    height: 45px;
    display: inline-block;
    line-height: 45px;
    text-align: center;
    background: #fff;
    border-radius: 50%;
    border: 7px solid #5db8e8;
    vertical-align: middle;
    text-align-last: center;
    font-size:18px ;
    color:#5db8e8 ;
    font-weight:800;
    position: relative;

  }
  .main_five_step_left_text::after{
    display: inline-block;
    content: "";
    width: 1px;
    height: 71px;
    /*background: magenta;*/
    border-left: 2px dashed #5db8e8;
    position: absolute;
    top: -78px;
    left: 0;
    right: 0;
    margin: auto;
  }
  .main_five_step_content_text{
    display: inline-block;
    border-radius: 10px;
    vertical-align: middle;
    font-family: '黑体';
    font-size: 17px;
    color: #ffffff;
    line-height: 60px;
    position: relative;
    z-index: 999;
  }
  .main_five_step_right_text{
    display: inline-block;
    vertical-align: middle;
    color:#717171 ;
    /*margin-left: 50%;*/
    position: relative;
  }
  .main_five_step_content_text,.main_five_step_right_text{
    vertical-align: middle;
    width: 140px;
    height: 60px;
    text-align: center;
    text-align-last: center;
    font-family: '黑体';
    font-size: 17px;
  }
  .main_five_step_right_text>span{
    position: absolute;
    width: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }

  .line{
    display: inline-block;
    vertical-align: middle;
    width: 30%;
    height: 1px;
    background: #589bc0;
    position: relative;
    /*box-shadow: 20px 4px 0 1px gray;*/
  }
  .line::before{
    position: absolute;
    content: "";
    display: inline-block;
    width: 25px;
    height: 25px;
    background:#599ac0 ;
    border-radius: 50%;
    margin-left: 100%;
    margin-top: -6%;
  }

  .complete_btn_box{
    display: block;
    text-align: center;
  }
  .complete_btn{
    width: 258px;
    height: 71px;
    line-height: 71px;
    display: inline-block;
    background: #5db8e8;
    border-radius: 20px;
    margin-top: 80px;
    margin-bottom: 40px;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
    text-align: center;
  }
  .activehide{
    display: none;
  }
  .not_stepfood_text{
    display: block;
padding-bottom: 35px;
    font-size: 17px;
  }
  /*.el-dialog__wrapper{*/
  /*position: relative;*/
  /*}*/
  .el-dialog{
    width: 950px;
  }
  .dialog-footer-now{
      display: block;

  }
  .footer_btn_box{

  }
  .dialog_cancel{
    margin-right: 15px;
  }
  .dialog_submit{
    margin-left: 15px;
  }

  .bigboxAdd{
    display: block;
    height: 120px;
    text-align: center;


  }
  .bigbox{
    width: 510px;
    height: 120px;
   overflow: hidden;
    padding-left: 15px;
    padding-right: 15px;
  }
  .bigboxtext{
    max-height: 118px;
   word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:4;
    overflow: hidden;
  }
  .block{
    display: flex;
    /*margin-left: 17px;*/
    height: 120px;
    align-items: center;
    justify-content: center;
  }
  .block>.main_first_step_box {
     box-sizing: border-box;
     padding-top: 6%;
    /*padding-bottom: 12%;*/
  }
  .box_line{
    max-height: 99px;
   display: block;
    text-align: center;
    overflow: auto;
    position: relative;
  }
  .box_line::-webkit-scrollbar{
      display: none;
      /*width: 5px;*/
    /*height: 5px;*/
     /*border-radius: 2px;*/
    /*background-color:rgba(0,0,0,.2);*/
  }
  .box_line_p{
    text-align: center;
  }
  .box_line_text{
    display: inline-block;
    text-align : left;
  }

</style>
