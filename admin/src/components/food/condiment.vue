<template>
  <div class="condiment">
      <button class="layui-btn" data-type="getCheckData" @click="addcondiment">添加新调料</button>
        <div class="search">
        <el-autocomplete
            v-model="search"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入搜索内容"
            @select="handleSelect"
            ></el-autocomplete>
          <el-select v-model="type" placeholder="分类查询调料">
              <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              ></el-option>
          </el-select>
       </div>
      <table class="layui-table" >
      <colgroup>
      <col width="120">
      <col width="150">
      <col width="380">
      <col>
      </colgroup>
      <thead>
      <tr>
          <th>食材名字</th>
          <th>食材类型</th>
          <th>更新时间</th>
          <th>状态</th>
          <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in condimentlist" :key="index">
          <td>{{item.condimentname}}</td>
          <td> {{item.condimenttype==1?'咸味调料':item.condimenttype==2?'甜味调料':item.condimenttype==3?'酸味调料':item.condimenttype==4?'辣味调料':item.condimenttype==5?'鲜味调料':'油品调料'}}</td>
          <td>{{item.createtime}}</td>
          <td>{{item.deletestate}}</td>
          <td>
              <a class="layui-btn layui-btn-xs" @click="foodedit(index)">编辑</a>
              <a class="layui-btn layui-btn-danger layui-btn-xs" @click="foodremove(index,item.condimentid)">删除</a>
          </td>
      </tr>
      </tbody>
  </table>
      <div class="block">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="condimentpresent"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="condimentsizes"
        layout="total,sizes, prev, pager, next"
        :total="total">
        </el-pagination>
    </div>

  <!-- 添加模态窗 -->
        <el-dialog title="添加新调料"
        class="add"
        :visible.sync="addnew"
        :before-close="closeDialog"
        :modal-append-to-body = "false"
        >
          <el-form label-width="80px" :model="addfrom" :rules="rules" >
            <el-form-item label="调料名称" prop="foodname">
                <el-input v-model="addfrom.foodname" class="food_name"></el-input>
            </el-form-item>
            <el-form-item label="选择口味"  prop="foodtype">
            <el-select v-model="addfrom.foodtype" placeholder="请选择类别">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                ></el-option>
            </el-select>
            </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                    <el-button @click="addCancel">取 消</el-button>
                    <el-button type="primary" @click="addSubmit">确 定</el-button>
                </div>
        </el-dialog>


              <!-- 修改模态窗 -->
    <el-dialog title="修改食材"
    :visible.sync="editnew"
    :before-close="closeEditDialog"
    :modal-append-to-body = "false">
      <el-form label-width="80px" >
        <el-form-item label="食材名称">
            <el-input v-model.trim="newlist.condimentname" class="food_name"></el-input>
        </el-form-item>
        <el-form-item label="所属类别">
        <el-select v-model="selected" placeholder="请选择类别">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            ></el-option>
        </el-select>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="editSubmit(newlist.condimentname,newlist.condimentid)">确 定</el-button>
            </div>
    </el-dialog>

  </div>
</template>

<script>
import {condiment,condiments,addcondiment,condimentupdate,searchcondiment,condimentcount,condimentdelete} from "@/api"
export default {
  inject:['reload'],
  data () {
    return {
      condimentlist:[],     //调料列表
      addfrom:{
         foodname:'',
         foodtype:'',
       },          //添加
      rules: {
        foodname: [{ required: true, message: '调料名称不能为空', trigger: 'blur' }],
        foodtype: [{ required: true, message: '请选择调料口味', trigger: 'blur' }],
      },
      options:[
            {
            value: '1',
            label: '咸味调料'
            }, {
            value: '2',
            label: '甜味调料'
            }, {
            value: '3',
            label: '酸味调料'
            }, {
            value: '4',
            label: '辣味调料'
            }, {
            value: '5',
            label: '鲜味调料'
            },
        {
          value: '6',
          label: '油品调料'
        }
      ],
      options1:[
           {
            value: '0',
            label: '所有调料'
            }, {
            value: '1',
            label: '咸味调料'
            }, {
            value: '2',
            label: '甜味调料'
            }, {
            value: '3',
            label: '酸味调料'
            }, {
            value: '4',
            label: '辣味调料'
            }, {
            value: '5',
            label: '鲜味调料'
            },
        {
          value: '6',
          label: '油品调料'
        }
      ],
      type:"",    //分类查询
      addnew:false,         //添加窗口
      editnew:false,        //编辑窗口
      newlist:[],           //编辑表单
      selected:'',
      total:this.condimentpresent+1,      //总页数
      condimentpresent:1,    //当前页
      condimentsizes:10,       //每页多少
      search:'',
      getallArr:[],
      flage:true,
    }
  },
  mounted(){
    //获取页面数据,及显示条数
    if(window.sessionStorage.length!==0){
      window.sessionStorage.condimentpresent? (this.condimentpresent=parseInt(window.sessionStorage.condimentpresent)):1;
      window.sessionStorage.condimentsizes? (this.condimentsizes=parseInt(window.sessionStorage.condimentsizes)):10;
    }
    else{
      this.condimentpresent=1;
      this.condimentsizes=10;
    }
    this.getnewdata();
    // this.getalldata();
  },
  watch:{
    type(val,old){

      if(val==0){
        condiment(this.condimentpresent,this.condimentsizes).then(res=>{
          this.condimentlist = res.data
       })
      }else{
        condiments(val,this.condimentpresent,this.condimentsizes).then(res=>{
         this.condimentlist = res.data;

       })
      }
    },

  },
  methods:{
    // 编辑调料取消按钮
    cancel(){
      this.editnew = false;
      this.getnewdata();
    },
    // 编辑调料关闭dialog
    closeEditDialog(){
      this.cancel();
    },
    //获取页面的调料数据
    getnewdata(){
      //获取总条数
      condimentcount(1).then(res=>{
        this.total = res.data
      })
      condiment(this.condimentpresent,this.condimentsizes).then(res=>{
        this.condimentlist = res.data
      })
    },
       querySearchAsync(queryString,cb) {
        var  list=[{}]
      searchcondiment(queryString).then(res=>{
        //   this.restaurants = res.data
                for(let i of res.data){
                    i.value = i.condimentname
                }
                this.condimentlist = res.data
                list= res.data
                cb(list)
            }).catch((error)=>{
                list=[{value:'暂无数据'}]
                cb(list)
                 condiment(this.condimentpresent,this.condimentsizes).then(res=>{
                this.condimentlist = res.data
                 })
            });
      },
        handleSelect(item) {
            // console.log(item);
        },

    //分页 显示条数
    handleSizeChange(val) {
        this.condimentsizes = val
        condiment(this.condimentpresent, this.condimentsizes).then(res=>{
          if(res.code===200){
            this.condimentlist = res.data;
            window.sessionStorage.setItem('condimentsizes',this.condimentsizes);
          }
    })
    },
    //分页 显示当前页码
    handleCurrentChange(val) {
        this.condimentpresent = val
      condiment( this.condimentpresent,this.condimentsizes).then(res=>{
        if(res.code===200){
          this.condimentlist = res.data;
          window.sessionStorage.setItem('condimentpresent',this.condimentpresent);
        }
    });
    },


    //添加调料按钮显示dialog
    addcondiment(){
        this.addnew = true
    },
    //添加调料按钮 提交添加调料
    addSubmit(){
      if(this.addfrom.foodname===''||this.addfrom.foodtype===''){
        this.$alert('所填信息不能为空', '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      }
      else {
        addcondiment(this.addfrom.foodname,this.addfrom.foodtype).then(res=>{
          console.log(res);
          if(res.code==200){
            this.addnew = false;
            // this.reload();
            this.getnewdata();
            this.addfrom.foodname= '';
            this.addfrom.foodtype='';
            this.$message({
              message: '上传成功',
              type: 'success',
              duration:1000,
              center: true
            })
          }
          if(res.code==500){
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            })
          }
        })
      }

    },
    //添加调料取消按钮
    addCancel(){
      this.addnew=false;
      this.addfrom.foodname= '';
      this.addfrom.foodtype='';
    },
    //添加调料 关闭dialog弹框事件
    closeDialog(){
      this.addCancel();
    },
    //编辑调料
    foodedit(id){
        this.editnew = true;
        this.newlist= this.condimentlist[id]  //存储此行数据
        this.selected = this.options[this.newlist.condimenttype-1].label     //下拉
    },
    //删除调料按钮
    foodremove(index,condimentid){
      condimentdelete(condimentid).then(res=>{
        if(res.code==200){
          this.condimentlist.splice(index,1);
          this.getnewdata();
          this.$message({
            message: '删除成功',
            type: 'warning',
            duration:1000,
            center: true
          })
        }
        else {
          this.$message({
            message: '删除失败',
            type: 'error',
            duration:1000,
            center: true
          })
        }
      });
      console.log(index,condimentid)

    },
    //编辑调料后提交
    editSubmit(val,id){
      if(val==""){
        this.$alert("调料不能为空", '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      }
      else {
        if(this.selected.length>2){
          this.selected = this.newlist.condimenttype
        }
        condimentupdate(this.newlist.condimentid,this.newlist.condimentname,this.selected).then(res=>{
          if(res.code==200){
            this.selected="";
            this.newlist.condimentname="";
            this.editnew=false
            // this.reload();
            this.getnewdata();
          }
          if(res.code==500){
            this.selected = this.options[this.newlist.condimenttype-1].label;
             //下拉
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            })
          }
        })
      }

    },
    getalldata(){
      let num=0;
      let that=this;
      condimentcount(1).then(res=>{
        if(res.code==200){
          num= res.data;
          condiment(1,num).then(res=>{
            if(res.code=200){
              that.getallArr = res.data;
              console.log(this.getallArr)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang = "scss" scoped>
.condiment{
  .search{
    margin-top: 10px;
  }
}
.food_name{
  width: 220px;
}

</style>
