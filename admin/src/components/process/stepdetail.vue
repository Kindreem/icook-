<template>
        <div class="container">
          <div class="header">
            <span class="header_tilt_cookbookname">{{this.arr[1]}}</span>
            <div class="header_title">
              <span>PAPT1食材准备</span>
            </div>
          </div>
          <div class="main">
            <div class="main_first_step_content" v-show="datafoodstep.sysBookFoodVOlist!==null">
              <div class="main_title_box" >
                <div class="main_title_big_box">
                  <span class="main_title_squre"></span>
                  <span class="main_title_text">
                      <i class="el-icon-star-on icon_star"></i>
                      食材
                  </span>
                </div>
              </div>
              <div class="main_first_step" v-for="(item,key) in datafoodstep.sysBookFoodVOlist">
                <div class="main_first_step_box">
                  <span class="main_first_step_text">{{item.foodname}}</span>
                  <span class="main_first_step_text" v-if="item.weight!==0">{{item.weight}}</span>
                  <span class="main_first_step_text" v-if="(item.weight!==0)&&(item.unit!==' ')">{{item.unit}}</span>
                  <span class="main_first_step_text" v-if="item.weight===0||item.unit===' '||item.unit==='  '">{{item.description}}</span>
                </div>
              </div>
            </div>
            <div class="main_second_step_content" v-show="datafoodstep.sysBookCondimentVOlist!==null">
              <div class="main_title_box" >
                <div class="main_title_big_box">
                  <span class="main_title_squre"></span>
                  <span class="main_title_text">
                      <i class="el-icon-star-on icon_star"></i>
                    调料
                  </span>
                </div>
              </div>
              <div class="main_first_step" v-for="(item,key) in datafoodstep.sysBookCondimentVOlist">
                <div class="main_first_step_box main_second_step_box">
                  <span class="main_first_step_text">{{item.condimentname}}</span>
                  <span class="main_first_step_text" v-if="item.weight!==0">{{item.weight}}</span>
                  <span class="main_first_step_text" v-if="(item.weight!==0)&&(item.unit!==' ')">{{item.unit}}</span>
                  <span class="main_first_step_text" v-if="item.weight===0||item.unit===' '||item.unit==='  '">{{item.description}}</span>
                </div>
              </div>
            </div>
            <div class="main_second_step_content" v-show="datafoodstep.sysBookExcipientsVOlist!==null">
              <div class="main_title_box" >
                <div class="main_title_big_box">
                  <span class="main_title_squre"></span>
                  <span class="main_title_text">
                      <i class="el-icon-star-on icon_star"></i>
                    辅料
                  </span>
                </div>
              </div>
              <div class="main_first_step" v-for="(item,key) in datafoodstep.sysBookExcipientsVOlist">
                <div class="main_first_step_box">
                  <span class="main_first_step_text">{{item.excipientsname}}</span>
                  <span class="main_first_step_text" v-if="item.weight!==0">{{item.weight}}</span>
                  <span class="main_first_step_text" v-if="(item.weight!==0)&&(item.unit!==' ')">{{item.unit}}</span>
                  <span class="main_first_step_text" v-if="item.weight===0||item.unit===''||item.unit===' '||item.unit==='  '">{{item.description}}</span>
                </div>
              </div>
            </div>
            <div class="header_title" v-show="datafoodstep.sysBookHandlingVOlist!==null">
              <span>PAPT2食材处理</span>
            </div>
            <div class="main_second_step_content" v-show="datafoodstep.sysBookHandlingVOlist!==null">
              <div class="main_title_box" >
                <div class="main_title_big_box">
                  <span class="main_title_squre"></span>
                  <span class="main_title_text">
                      <i class="el-icon-star-on icon_star"></i>
                    食材加工
                  </span>
                </div>
              </div>
              <div class="main_first_step" v-for="(item,key) in datafoodstep.sysBookHandlingVOlist">
                <div class="main_first_step_box main_second_step_box">
                  <span class="main_first_step_text">{{item.name}}</span>
                  <span class="main_first_step_text">{{item.handlingname}}</span>
                </div>
              </div>
            </div>
            <div class="header_title" v-show="datafoodstep.sysBookCookingVOlist!==null">
              <span>PAPT3食材烹饪</span>
            </div>
            <div class="main_second_step_content " v-show="datafoodstep.sysBookCookingVOlist!==null">
              <div class="main_title_box main_title_five_box" >
                <div class="main_title_big_box">
                  <span class="main_title_squre"></span>
                  <span class="main_title_text">
                      <i class="el-icon-star-on icon_star"></i>
                    食材烹饪
                  </span>
                </div>
              </div>
              <div class="main_five_step_box" v-for="(item,key) in datafoodstep.sysBookCookingVOlist">
                <div class="main_five_step">
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
              <span class="complete_btn" @click="jumppage">烹饪完成</span>
              <div class="circular_box"></div>
            </div>
            <div class="header_title" v-show="datafoodstep.sysBookTrayVOlist!==null">
              <span>PAPT3食材装盘</span>
            </div>
            <div class="main_second_step_content " v-show="datafoodstep.sysBookTrayVOlist!==null">
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
                <div class="main_five_step">
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
              <span class="complete_btn" @click="jumppage">摆盘完成</span>
            </div>
          </div>
        </div>
</template>

<script>
  import {getbookprocess} from  "../../api";
    export default {
        name: "stepdetail",
      data(){
          return{
            cookbookid:'',//菜谱id
            cookbookname:'',//菜谱名称
            datafoodstep:{},//获取菜谱所有步骤
            bgcolor:'',//烹饪颜色
            arr:[],//存储本地缓存传过来的 arr[0]cookbookid arr[1]cookbookname
          }
      },
      mounted(){
        this.arr=this.$_store.get('data','object');
        //通过菜谱id获取菜谱步骤
        getbookprocess(this.arr[0]).then
        (res=>{
          this.datafoodstep=res.data;
          console.log(this.datafoodstep);
        })
      },
      created(){
      },

      methods: {
          color(){
            //随机生成颜色
            let colorArr=['e3cc70','64573a','6b7b8d','b2250f','bdb7b7','a2c3e3','8d6272'];
            let index = Math.floor((Math.random()*colorArr.length));
            return '#'+colorArr[index];
          },
        // linegrd(){
        //  return  ' -webkit-linear-gradient'+'(top,'+' '+this.col1+' '+this.baifenbi1+','+' '+'#ffffff'+' '+this.baifenbi2+')';
        // },
        jumppage(){
            //页面跳转，跳转到菜谱列表页
           this.$router.push({
             path:'/countStepview',
             query:{

             }
           })
        }
      }
    }
</script>

<style scoped lang='scss'>
  *{
    margin: 0;
    padding: 0;
  }
.container{
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
  width: 65%;
  margin: 40px auto 40px auto;
}
  .main_first_step_box{
    width: 233px;
    height: 120px;
    background: #5db8e8;
    color: #fff;
    display: table-cell;
    border-radius: 20px;
    text-align: center;
    vertical-align: middle;
  }
  .main_second_step_box{
    background: #2a6987;
  }
  .main_first_step_text{
      display:block;
  }
  .main_first_step{
    display: inline-block;
    margin-top: 20px;
    margin-left: 35px;
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
    height: 71px;
    /*background: darkseagreen;*/
    background: #fff;
    position: absolute;
    bottom: -71px;
    z-index: 998;
    border-top-left-radius: 80px;
    border-top-right-radius: 80px;

  }

  .main_title_big_box{
    display: inline-block;
    width: 200px;
    height: 61px;
    position: absolute;
    left:-26%;
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
    width: 80%;
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
.main_five_step_content_text::after{
  content: "";
  display: inline-block;
  vertical-align: middle;
  width: 200%;
  height: 1px;
  background: #589bc0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 140px;
  z-index: 997;
  margin: auto;
  /*box-shadow: 20px 4px 0 1px gray;*/
}
    .main_five_step_content_text::before{
      position: absolute;
      content: "";
      display: inline-block;
      width: 25px;
      height: 25px;
      background:#599ac0 ;
      top:0;
      bottom: 0;
      left: 405px;
      margin: auto ;
      border-radius: 50%;

    }
  .line{
    width:140px;
    height: 60px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
  }
  /*.line::after{*/
    /*width: 4px;*/
    /*height: 197px;*/
    /*content: "";*/
    /*display: inline-block;*/
    /*background: #599ac0;*/
    /*position: absolute;*/
    /*top: 30px;*/
    /*left: 20%;*/
    /*z-index: 998;*/
  /*}*/
  /*.main_second_step_content{*/
    /*position: relative;*/
  /*}*/
  /*.circular_box{
    display: inline-block;
    width: 50px;
    height: 50px;
    background: #fff;
    border: 8px solid #5cb7e6;
    border-radius: 50%;
    position: absolute;
    bottom:-168px;
    z-index: 999;
  }*/
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
  }

</style>
