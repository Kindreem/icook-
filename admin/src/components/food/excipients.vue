<template>
  <div class="excipients">
   <button class="layui-btn" data-type="getCheckData" @click="add">添加新辅料</button>
    <el-autocomplete
        v-model="search"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入搜索内容"
        @select="handleSelect"
     ></el-autocomplete>
    <table class="layui-table" >
      <colgroup>
      <col width="250">
      <col width="250">
      <col width="200">
      <col>
      </colgroup>
      <thead>
      <tr>
          <th>辅料名字</th>
          <th>更新时间</th>
          <th>状态</th>
          <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in excipientslist" :key="index">
          <td>{{item.excipientsname}}</td>
          <td>{{item.createtime}}</td>
          <td>{{item.deletestate}}</td>
          <td>
              <a class="layui-btn layui-btn-xs" @click="edit(index)">编辑</a>
              <a class="layui-btn layui-btn-danger  layui-btn-xs" @click="removefood(index,item.excipientsid)">删除</a>
          </td>
      </tr>
      </tbody>
  </table>
       <div class="block">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="excipientspresent"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="excipientssizes"
        layout="total,sizes, prev, pager, next"
        :total="total">
        </el-pagination>
    </div>

    <!-- 添加模态窗 -->
    <el-dialog title="添加新辅料"
    class="add"
    :visible.sync="addnew"
    :before-close="closeDialog"
    :modal-append-to-body = "false">
        <el-form label-width="80px"  >
        <el-form-item label="调料名称">
            <el-input v-model="name"></el-input>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
                <el-button @click="addnew = false">取 消</el-button>
                <el-button type="primary" @click="addSubmit">确 定</el-button>
            </div>
    </el-dialog>

     <!-- 修改模态窗 -->
    <el-dialog title="修改辅料"
    :visible.sync="editnew"
    :before-close="closeEditDialog"
    :modal-append-to-body = "false">
      <el-form label-width="80px" >
        <el-form-item label="食材名称">
            <el-input v-model.trim="newlist.excipientsname"></el-input>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="editSubmit(newlist.excipientsname)">确 定</el-button>
            </div>
    </el-dialog>
  </div>
</template>

<script>
import {excipients,excipientscount,addexcipients,updateexcipients,searchexcipients,excipientsdelete} from "@/api"
export default {
  inject:['reload'],
  data () {
    return {
        addnew:false,
        editnew:false,
        excipientslist:[],     //辅料列表
        name:'',               //辅料名字
        newlist:[],    //修改列表
        total:this.excipientspresent+1,      //总页数
        excipientspresent:1,    //当前页
        excipientssizes:10,       //每页多少
        search:'',
    }
  },
  mounted(){
    if(window.sessionStorage.length!==0){
      window.sessionStorage.excipientspresent? (this.excipientspresent=parseInt(window.sessionStorage.excipientspresent)):1;
      window.sessionStorage.excipientssizes? (this.excipientssizes=parseInt(window.sessionStorage.excipientssizes)):10;
    }
    else{
      this.excipientspresent=1;
      this.excipientssizes=10;
    }
      this.getnewdata()
  },
  methods:{
    // 编辑辅料取消按钮
      cancel(){
          this.editnew = false;
          this.getnewdata()
      },
    // 编辑辅料关闭dialog
    closeEditDialog(){
        this.cancel();
    },
    //获取页面辅料数据
    getnewdata(){
        //获取总数
      excipientscount(1).then(res=>{
          this.total = res.data
      })
      //获取辅料列表
      excipients(this.excipientspresent,this.excipientssizes).then(res=>{
          this.excipientslist = res.data
      })
    },

    //搜索
        querySearchAsync(queryString,cb) {
    var  list=[{}]
    searchexcipients(queryString).then(res=>{
    //   this.restaurants = res.data
            for(let i of res.data){
                i.value = i.excipientsname
            }
            this.excipientslist = res.data
            list= res.data
            cb(list)
        }).catch((error)=>{
            list=[{value:'暂无数据'}]
            cb(list)
                excipients(this.excipientspresent,this.excipientssizes).then(res=>{
            this.excipientslist = res.data
                })
        });
    },
    handleSelect(item) {
        // console.log(item);
    },

    //分页 显示条数
    handleSizeChange(val) {
        this.excipientssizes = val
        excipients(this.excipientspresent,this.excipientssizes).then(res=>{
         if(res.code===200){
           this.excipientslist = res.data;
           window.sessionStorage.setItem('excipientssizes',this.excipientssizes);
         }
    })
    },
    //分页 显示当前页码
    handleCurrentChange(val) {
        this.excipientspresent = val;
      excipients(this.excipientspresent,this.excipientssizes).then(res=>{
        if(res.code===200){
          this.excipientslist = res.data;
          window.sessionStorage.setItem('excipientspresent',this.excipientspresent);
        }
    });
    },

    //辅料添加按钮显示dialog
      add(){
          this.name = ''
          this.addnew = true;
      },
    //辅料添加后提交
      addSubmit(){
        if(this.name === ''){
          this.$alert('所填信息不能为空', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          })
        }
        else {

          addexcipients(this.name).then(res=>{
            if(res.code==200){
              this.addnew = false;
              // this.reload();
              this.getnewdata();
              this.name='';
              this.$message({
                message: '上传成功',
                type: 'success',
                duration:1000,
                center: true
              })
            }if(res.code==500){
              this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
              })
            }
          })
        }
      },
    //添加辅料取消按钮
    addCancle(){
      this.addnew = false;
      this.name='';
    },
    //添加辅料 关闭dialog弹框事件
    closeDialog(){
        this.addCancle();
    },
    //   修改
    edit(id){
        this.editnew = true
        this.newlist= this.excipientslist[id]
    },
  //删除
    removefood(index,excipientsid){
        // console.log(index,excipientsid)
      excipientsdelete(excipientsid).then(res=>{
        if(res.code==200){
          this.excipientslist.splice(index,1);
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

      })

    },
    editSubmit(val){
        if(val==""){
          this.$alert("辅料不可为空", '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          })
        }
        else {
          updateexcipients(this.newlist.excipientsid,this.newlist.excipientsname).then(res=>{
            if(res.code==200){
              // this.reload();
              this.newlist.excipientsname='';
              this.editnew = false;
              this.getnewdata();
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

    }
  }
}
</script>

<style lang = "scss" scoped>

</style>
