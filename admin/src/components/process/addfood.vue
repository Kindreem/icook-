<template>
  <div class="container">
    <el-steps :active="active"   finish-status="success">
      <el-step title="1 添加食材"></el-step>
      <el-step title="2 添加辅料"></el-step>
      <el-step title="3 添加调料"></el-step>
      <el-step title="4 食材加工"></el-step>
      <el-step title="5 食材烹饪"></el-step>
      <el-step title="6 食材装盘"></el-step>
    </el-steps>
    <!--<el-button style="margin-top: 12px;" @click="all">完成</el-button>-->
    <router-view></router-view>
  </div>

</template>

<script>
    export default {
        name: "addfood",
      data(){
          return{
            active: 0
          }
      },
      methods:{
        all(){

        }
      },
      created(){
          this.$bus.$on('nextgo',(val)=>{
            this.active=val;
            (this.active> 6)&&(this.active = 0) ;
          });
        this.$bus.$on('prevgo',(val)=>{
          this.active=val;
          (this.active<1) &&(this.active = 0);
        });
        //    let pageval=window.sessionStorage.getItem('pageval');
        //   parseInt(pageval)?this.active=parseInt(pageval):0;
        //    console.log(this.active);
        //   (this.active> 6||this.active<1)&&(this.active = 0);
      }
    }
</script>

<style scoped>

</style>
