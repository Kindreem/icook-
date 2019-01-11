<template>
  <div class="manager">
    <div class="layui-btn-group demoTable">
    <button class="layui-btn" @click="addmanager=true">添加管理员</button>
    </div>
    <el-table
    :data="tableData.data"
    border
    style="width: 80%">
    <el-table-column
    type="selection"
    width="55">
    </el-table-column>
    <el-table-column
      prop="username"
      label="账号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码"
      width="180">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别">
    </el-table-column>
    <el-table-column
      prop="city"
      label="地址">
    </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <a class="layui-btn layui-btn-primary layui-btn-xs" @click="handleClick(scope.row)" type="text" size="small">查看</a>
        <a class="layui-btn layui-btn-xs">编辑</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs">删除</a>
      </template>
    </el-table-column>
  </el-table>


    <!-- <table class="layui-hide" id="test"></table>   -->
    <el-dialog title="添加管理员" 
    :visible.sync="addmanager"
    :modal-append-to-body = "false">
        <el-form :model="addForm" label-width="80px" :rules="rules" ref="addUserForm">
            <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="mobile">
            <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addmanager= false">取 消</el-button>
            <el-button type="primary" @click="addUserSubmit('addUserForm')">确 定</el-button>
    </div>
</el-dialog>    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      tableData:[],
      addmanager:false,
      addForm: {
            username: '',
            password: '',
            email: '',
            mobile: ''
        },
        rules: {
            username: [{ 
                required: true, message: '请输入用户名', trigger: 'blur'
            }],
            password: [{ 
                required: true, message: '请输入密码', trigger: 'blur' 
            }],
            email: [{ 
                required: true, message: '请输入邮箱地址', trigger: 'blur' },{ 
                type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'
            }],
            mobile: [{ 
                required: true, message: '电话不能为空' 
            }]
        },
    }
  },
  created(){
      axios.get('http://192.168.0.105:3000/api/manager').then(res=>{
        this.tableData = res.data
      })
  },
  methods:{
       handleClick(row) {
        console.log(row);
      }
  },
  mounted(){}
}
</script>

<style lang='scss' scoped>
.manager{
    
   /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner{
     background: #009688;
     border-color: #009688;
   }
   /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,{
   background: #009688;
   border-color: #009688;
  }
  .layui-btn-group{
    margin-bottom: 10px;
  }
  
}
</style>
