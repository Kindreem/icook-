<template>
    <div class="container">
      <el-form label-position="right" label-width="200px" :model="data">
        <el-form-item label="食谱书ID" class="cookbook" >
          <el-input v-model="data.cookbookid"></el-input>
        </el-form-item>
        <el-form-item label="添加步骤">
          <el-select v-model="data.step" placeholder="步骤" >
            <el-option label="步骤一" value="0"></el-option>
            <el-option label="步骤二" value="1"></el-option>
            <el-option label="步骤三" value="2"></el-option>
            <el-option label="步骤四" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" class="cookbook" >
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows:10}"
            placeholder="请输入内容"
            v-model="data.description" class="el-textarea">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(data.cookbookid,data.step,data.description)" :plain="true">立即添加</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import {recipes} from  "../../api";
    export default {
        name: "packingStep",
       data(){
          return{
            data: {
              cookbookid: '',
              description: '',
              step:'',
              // type: ''
            },
            dataArr:[],
          }
      },
      methods:{
        onSubmit(cookbookid,step,description){
          let reg=/^[0-9]*$/;
          if(cookbookid===''||step===''||description===''){
            this.$alert('所填信息不能为空', '提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            })
          }
          else if(!reg.test(cookbookid)){
            this.$alert('食谱id必须为数字', '提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            })
          }
          else if(description.length>500){
            this.$alert('描述内容过长不可超过500字', '提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            })
          }
          else {
            this.data.cookbookid=parseInt(cookbookid);
            this.data.step=parseInt(step);
           this.dataArr.push(this.data);
           // console.log(this.dataArr);
            recipes(this.dataArr)
              .then(res=>{
                this.$message({
                  showClose: true,
                  message: '添加成功！',
                  type: 'success'
                });
                this.cancel();
                // console.log(this.dataArr);
              })
          }
        },
        cancel(){
          this.dataArr=[];
          this.data.cookbookid='';
          this.data.step='';
          this.data.description='';
        }
      },
    }
</script>

<style scoped>
  .container{
    margin-top:80px;
  }
  .cookbook{
    width: 420px;
  }
  .el-textarea{
    width: 400px;
  }
</style>
