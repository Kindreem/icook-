<template>
  <div class="home">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="220px">
        <div class="logo">icook&nbsp;后台</div>
        <el-menu
          :router="true"
          :unique-opened="true"
          :collapse="isCollapse"
          class="el-menu-admin"
          @open="handleOpen"
          @close="handleClose"
          background-color="#383C48"
          text-color="#fff"
          active-text-color="#ffd04b"

        >
          <el-submenu index="1">
            <template slot="title">
              <i class="layui-icon layui-icon-set"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item index="power">
              <i class="el-icon-menu"></i>
              <span slot="title">权限管理</span>
            </el-menu-item>
             <el-menu-item index="manager">
              <i class="el-icon-menu"></i>
              <span slot="title">管理员管理</span>
            </el-menu-item>
             <el-menu-item index="operation">
              <i class="el-icon-menu"></i>
              <span slot="title">操作记录</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="layui-icon layui-icon-friends"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="#">
              <i class="el-icon-menu"></i>
              <span slot="title">1111</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="layui-icon layui-icon-template"></i>
              <span>菜谱管理</span>
            </template>
            <el-menu-item index="official">
              <i class="el-icon-menu"></i>
              <span slot="title">官方菜谱管理</span>
            </el-menu-item>
            <el-menu-item index="#">
              <i class="el-icon-menu"></i>
              <span slot="title">用户菜谱管理</span>
            </el-menu-item>
          </el-submenu>
           <el-submenu index="4">
            <template slot="title">
              <i class="layui-icon layui-icon-404"></i>
              <span>食材管理</span>
            </template>
            <el-menu-item index="food">
              <i class="el-icon-menu"></i>
              <span slot="title">食材管理</span>
            </el-menu-item>
              <el-menu-item index="condiment">
              <i class="el-icon-menu"></i>
              <span slot="title">调料管理</span>
            </el-menu-item>
              <el-menu-item index="excipients">
              <i class="el-icon-menu"></i>
              <span slot="title">辅料管理</span>
            </el-menu-item>
          </el-submenu>
           <el-submenu index="5">
            <template slot="title">
              <i class="layui-icon layui-icon-404"></i>
              <span>流派管理</span>
            </template>
            <el-menu-item index="genre">
              <i class="el-icon-menu"></i>
              <span slot="title">流派管理</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="layui-icon layui-icon-404"></i>
              <span>分解流程管理</span>
            </template>
            <el-menu-item index="countStepview" @click="activelast" >
              <i class="el-icon-menu"></i>
              <span slot="title" >菜谱分解流程列表</span>
            </el-menu-item>
            <!--<el-menu-item index="step1addfood" @click="active(0)">-->
              <!--<i class="el-icon-menu welcome"  :class="[this.i===0?'active1':'el-icon-menu']"></i>-->
              <!--&lt;!&ndash;:class="[this.$store.state.next1===0?'col':'']"&ndash;&gt;-->
              <!--<span slot="title" class="welcome" :class="[this.i===0?'active1':'']">添加菜谱食材</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="step2addfood" @click="active(1)">-->
              <!--<i class="el-icon-menu welcome" :class="[this.i===1?'active1':'el-icon-menu']"></i>-->
              <!--<span slot="title" class="welcome" :class="[this.i===1?'active1':'']">添加菜谱调料</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="step3addfood" @click="active(2)">-->
              <!--<i class="el-icon-menu welcome" :class="[(this.i===2)?'active1':'el-icon-menu']"></i>-->
              <!--<span slot="title"  class="welcome" :class="[(this.i===2)?'active1':'']">添加菜谱辅料</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="step4addfood"  @click="active(3)">-->
              <!--<i class="el-icon-menu welcome" :class="[this.i===3?'active1':'el-icon-menu']"></i>-->
              <!--<span slot="title" class="welcome" :class="[this.i===3?'active1':'']">添加菜谱加工</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="step5addfood" @click="active(4)">-->
              <!--<i class="el-icon-menu welcome" :class="[this.i===4?'active1':'el-icon-menu']"></i>-->
              <!--<span slot="title"  class="welcome" :class="[this.i===4?'active1':'']">添加菜谱烹饪</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="step6addfood" @click="active(6)">-->
              <!--<i class="el-icon-menu welcome" :class="[this.i===6?'active1':'el-icon-menu']" ></i>-->
              <!--<span slot="title" class="welcome" :class="[this.i===6?'active1':'']">添加菜谱装盘</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="process" @click="active(5)">-->
              <!--<i class="el-icon-menu welcome" :class="[this.i===5?'active1':'el-icon-menu']"></i>-->
              <!--<span slot="title"  class="welcome" :class="[this.i===5?'active1':'']">添加菜谱分解</span>-->
            <!--</el-menu-item>-->
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- header部分 -->
        <el-header>
          <i class="myicon myicon-menu toggle-btn" @click="toggleCollapse"></i>
          <div class="system-title">后台管理系统</div>
          <div>
            <span class="welcome">
              您好
            </span>
            <el-button type="text">退出</el-button>
          </div>
        </el-header>
        <!-- 中间内容部分 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      menuData: [],
      flag:false,
      i:'',
      val:''
    };
  },
  methods: {
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
      console.log(key,keyPath)
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    active(index){
      this.i=index;
    },
    activelast(){
      // window.localStorage.clear();
    }

  },

  created() {
    this.$bus.$on('nextgo',(val)=>{
        this.i=val;
    })
  }
};
</script>
<style lang="scss" scoped>
.home {
  height: 100vh;
  .el-container {
    height: 100%;
    i.layui-icon{
      margin:0 10px;
    }
    .el-menu-item{
      margin-left: 15px;
    }
  }
  .el-aside {
    background-color: #383C48;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #22262E;
  }
  .logo {
    height: 60px;
    line-height: 60px;
    // background-size: cover;
    background-color: #22262E;
    color: #009688;
    font-size: 24px;
    text-align: center;

  }
  .toggle-btn {
    font-size: 36px;
    color: #989898;
    cursor: pointer;
    line-height: 60px;
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .logout-btn {
    color: orange;
  }
  .welcome {
    color: white;
  }
  .active1{
    /*color: rgb(255, 208, 75);*/
    color: orange;
  }
  .default{
    color:rgb(255, 255, 255);
  }
}


</style>
