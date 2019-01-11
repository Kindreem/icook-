<template>
  <div class="home">
     <div class="layui-layout layui-layout-admin">
  <div class="layui-header">
    <div class="layui-logo">icook后台</div>
    <!-- 头部区域（可配合layui已有的水平导航） -->
    <ul class="layui-nav layui-layout-left">
      <li class="layui-nav-item"><a href="##">控制台</a></li>
      <li class="layui-nav-item"><a href="##">商品管理</a></li>
      <li class="layui-nav-item"><a href="##">用户</a></li>
      <li class="layui-nav-item">
        <a href="javascript:;">其它系统</a>
        <dl class="layui-nav-child">
          <dd><a href="##">邮件管理</a></dd>
          <dd><a href="##">消息管理</a></dd>
          <dd><a href="##">授权管理</a></dd>
        </dl>
      </li>
    </ul>
    <ul class="layui-nav layui-layout-right">
      <li class="layui-nav-item">
        <a href="javascript:;">
          <img src="http://t.cn/RCzsdCq" class="layui-nav-img">
          贤心
        </a>
        <dl class="layui-nav-child">
          <dd><a href="">基本资料</a></dd>
          <dd><a href="">安全设置</a></dd>
        </dl>
      </li>
      <li class="layui-nav-item"><a href="##">退了</a></li>
    </ul>
  </div>

  <div class="layui-side layui-bg-black">
    <div class="layui-side-scroll">
      <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
      <ul class="layui-nav layui-nav-tree"  lay-filter="test">
        <li class="layui-nav-item layui-nav-itemed">
          <a class="" href="javascript:;">
          <i class="layui-icon layui-icon-set"></i>系统管理</a>
          <dl class="layui-nav-child">
            <dd><router-link to="/power">权限管理</router-link></dd>
            <dd><router-link to="/manager">管理员管理</router-link></dd>
            <dd><router-link to="/operation">操作记录</router-link></dd>
          </dl>
        </li>
        <li class="layui-nav-item">
          <router-link to="/user">
            <i class="layui-icon layui-icon-friends"></i>用户管理
        </router-link></li>
        <li class="layui-nav-item">
          <a href="javascript:;">
            <i class="layui-icon layui-icon-template"></i>菜谱管理</a>
          <dl class="layui-nav-child">
            <dd><router-link to="/official">官方菜谱管理</router-link></dd>
            <dd><a href="javascript:;">用户菜谱管理</a></dd>
          </dl>
        </li>
         <li class="layui-nav-item">
          <a href="javascript:;">
            <i class="layui-icon layui-icon-template"></i>食材管理</a>
          <dl class="layui-nav-child">
            <dd><router-link to="food">食材管理</router-link></dd>
            <dd><router-link to="condiment">调料管理</router-link></dd>
            <dd><router-link to="excipients">辅料管理</router-link></dd>
          </dl>
        </li>

      </ul>
    </div>
  </div>

  <div class="layui-body">
    <!-- 内容主体区域 -->
    <div style="padding: 18px;">
        <router-view/>
    </div>
  </div>

  <div class="layui-footer">
    <!-- 底部固定区域 -->
    © layui.com - 底部固定区域
  </div>
</div>


  </div>
</template>

<script>
export default {

  data () {
    return {
    }
  },
  mounted(){

    layui.use('element', function(){
      var element = layui.element;

    });
  },
  created(){
  }

}
</script>

<style lang="scss" scoped>
.home{
  .layui-nav dl{
    padding-left:26px;
  }
  .layui-nav-item i{
    margin-right: 12px;
  }
}

</style>
