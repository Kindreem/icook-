<template>
  <div class="login">
    <div class="layadmin-user-login-main">
      <div class="layadmin-user-login-box layadmin-user-login-header">
        <h2>管理员登录</h2>
        <p>layui 官方出品的单页面后台管理模板系统</p>
      </div>
      <div class="layadmin-user-login-box layadmin-user-login-body layui-form">
        <div class="layui-form-item">
          <label class="layadmin-user-login-icon layui-icon layui-icon-username"></label>
          <input type="text" name="username" placeholder="用户名" class="layui-input">
        </div>
        <div class="layui-form-item">
          <label class="layadmin-user-login-icon layui-icon layui-icon-password"></label>
          <input type="password" name="password" placeholder="密码" class="layui-input">
        </div>

        <div class="layui-form-item">
          <router-link to="home">
          <button class="layui-btn layui-btn-fluid">登录</button>
          </router-link>
        </div>

      </div>
  </div>

  </div>
</template>

<script>
export default {

  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  .layadmin-user-login-main{
    width: 35%;
    margin: 300px auto;
    .layui-form-item{
      margin-top: 40px;
      position: relative;
      label{
          position: absolute;
          top: 50%;
          left: 6px;
          transform: translateY(-50%);
      }
      .layui-input{
        height: 52px;
        padding-left: 30px;
      }
      .layui-btn{
        height: 50px;
      }
    }
  }
}
</style>
