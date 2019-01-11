<template>
  <div class="food">
     <button class="layui-btn" data-type="getCheckData" @click="addfood">添加食材</button>
    <div class="search">
     <el-autocomplete
        v-model="search"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入搜索内容"
        @select="handleSelect"
        ></el-autocomplete>
        <el-select v-model="type" placeholder="分类查询">
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
            <col width="280">
            <col width="160">
            <col width="300">
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
            <tr v-for="(item,index) in foodlist" :key="index">
                <td>{{item.foodname}}</td>
                <td> {{item.foodtype==1?'新鲜水果':item.foodtype==2?'海鲜水产':item.foodtype==3?'蔬菜蛋品':item.foodtype==4?'精选肉类':item.foodtype==5?'乳品冷饮':item.foodtype==6?'面点烘焙':item.foodtype==7?'方便速食':item.foodtype==8?'火锅丸类':'腌制品'}}</td>
                <td>{{item.createtime}}</td>
                <td>{{item.deletestate}}</td>
                <td>
                    <a class="layui-btn layui-btn-xs" @click="foodedit(index)">编辑</a>
                    <a class="layui-btn layui-btn-danger layui-btn-xs" @click="foodremove(index,item.foodid)">删除</a>
                </td>
            </tr>
            </tbody>
        </table>
     <div class="block">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="foodpresent"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="foodsizes"
        layout="total,sizes, prev, pager, next"
        :total="total">
        </el-pagination>
    </div>


        <!-- 添加模态窗 -->
        <el-dialog title="添加新食材"
        class="add"
        :visible.sync="addnew"
        :before-close="closeDialog"
        :modal-append-to-body = "false">
          <el-form label-width="80px" :model="addfrom" :rules="rules" >
            <el-form-item label="食材名称" prop="foodname">
                <el-input v-model="addfrom.foodname" class="food_name"></el-input>
            </el-form-item>
            <el-form-item label="所属类别"  prop="foodtype">
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
                    <el-button @click="addCancle">取 消</el-button>
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
                <el-input v-model.trim="foods.foodname" class="food_name"></el-input>
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
                    <el-button type="primary" @click="editSubmit(foods.foodname)">确 定</el-button>
                </div>
        </el-dialog>

  </div>
</template>

<script>
import {getfoods,getfood,addfood,foodupdate,search,foodcount,fooddelete} from "@/api"
export default {
  inject:['reload'],
  data () {
    return {
        search:'',      //搜索
        options: [{
            value: '1',
            label: '新鲜水果'
            }, {
            value: '2',
            label: '海鲜水产'
            }, {
            value: '3',
            label: '蔬菜蛋品'
            }, {
            value: '4',
            label: '精选肉类    '
            }, {
            value: '5',
            label: '乳品冷饮'
            }, {
            value: '6',
            label: '面试烘焙'
            }, {
            value: '7',
            label: '方便速食'
            }, {
            value: '8',
            label: '火锅丸类'
            },
          {
            value: '9',
            label: '熟食腊味'
          }
            ],         //食材类别
        options1: [{
                value: '0',
                label: '所有分类'
                },{
                value: '1',
                label: '新鲜水果'
                }, {
                value: '2',
                label: '海鲜水产'
                }, {
                value: '3',
                label: '蔬菜蛋品'
                }, {
                value: '4',
                label: '精选肉类    '
                }, {
                value: '5',
                label: '乳品冷饮'
                }, {
                value: '6',
                label: '面食烘焙'
                }, {
                value: '7',
                label: '方便速食'
                }, {
                value: '8',
                label: '火锅丸类'
                },
                {
                  value: '9',
                  label: '熟食腊味'
                }
                ],         //食材类别
        foodlist:[],   //食材列表
        rules: {
          foodname: [{ required: true, message: '食材名称不能为空', trigger: 'blur' }],
          foodtype: [{ required: true, message: '请选择食材所属类别', trigger: 'blur' }],
        },
        addfrom:{
            foodname:'',
            foodtype:'',
        },
        addnew:false,
        editnew:false,
        foodid:'',       //食材id
        foods:[],
        selected:'',      //修改时下拉选择器
        total:this.foodpresent+1 ,      //总页数
        foodpresent:1,    //当前页
        foodsizes:10,       //每页多少
        type:''
    }
  },
  mounted() {
    //获取页面数据,及显示条数
    if(window.sessionStorage.length!==0){
      window.sessionStorage.foodpresent? (this.foodpresent=parseInt(window.sessionStorage.foodpresent)):1;
      window.sessionStorage.foodsizes? (this.foodsizes=parseInt(window.sessionStorage.foodsizes)):10;
    }
    else{
      this.foodpresent=1;
      this.foodsizes=10;
    }
      this.getnewdata();
  },
  watch:{
      type(val,old){
          if(val=='0'){
                getfoods(this.foodpresent,this.foodsizes).then(res=>{
                    this.foodlist = res.data
                })
          }else{
               getfood(val,this.foodpresent,this.foodsizes).then(res=>{
                    this.foodlist = res.data
                })
          }
      }
  },
  methods:{
      //获取食材列表
      getnewdata(){
        foodcount(1).then(res=>{
            this.total = res.data
        })
        getfoods(this.foodpresent,this.foodsizes).then(res=>{
            this.foodlist = res.data
        })
      },

      //分页 显示条数
     handleSizeChange(val) {
         this.foodsizes = val;
         getfoods(this.foodpresent,this.foodsizes).then(res=>{
          if(res.code===200){
            this.foodlist = res.data;
            window.sessionStorage.setItem('foodsizes',this.foodsizes);
          }
      })
      },
    //分页 显示当前页码
      handleCurrentChange(val) {
          this.foodpresent = val;
       getfoods(this.foodpresent,this.foodsizes).then(res=>{
          if(res.code===200){
            this.foodlist = res.data;
            window.sessionStorage.setItem('foodpresent',this.foodpresent);
          }
      });
      },

       querySearchAsync(queryString,cb) {
        var  list=[{}]
      search(queryString).then(res=>{
        //   this.restaurants = res.data
                for(let i of res.data){
                    i.value = i.foodname
                }
                this.foodlist = res.data
                list= res.data
                cb(list)
            }).catch((error)=>{
                list=[{value:'暂无数据'}]
                cb(list)
                 getfoods(this.foodpresent,this.foodsizes).then(res=>{
                this.foodlist = res.data
                 })
            });
      },
        handleSelect(item) {
            // console.log(item);
        },

      //添加食材按钮弹框
      addfood() {
          this.addnew = true;
          this.addfrom.foodname= ''

      },
      //修改食材取消按钮
      cancel(){
          this.editnew = false;
          this.getnewdata();
      },
    //关闭编辑食材dialog弹框事件
    closeEditDialog(){
        this.cancel();
    },
    //关闭添加食材dialog弹框事件
    closeDialog(){
        this.addCancle();
    },
    //添加食材取消按钮
    addCancle(){
        this.addnew = false
        this.addfrom.foodname= '';
        this.addfrom.foodtype='';
      },

    //添加食材确定按钮
      addSubmit(){
        if(this.addfrom.foodname=== ''||this.addfrom.foodtype===''){
          this.$alert('所填信息不能为空', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          })
        }
        else {
          addfood(this.addfrom.foodname,this.addfrom.foodtype).then(res=>{
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
      //编辑食材
      foodedit(id){
        //   console.log(id)
          this.editnew = true;
          this.foodid=id
          this.foods = this.foodlist[this.foodid]  //存储此行数据
        // console.log(this.foods.foodtype)
          this.selected = this.options[this.foods.foodtype-1].label     //下拉

      },
    //删除食材
    foodremove(index,foodid){
        console.log(index,foodid);
      fooddelete(foodid).then(res=>{
        if(res.code==200){
           this.foodlist.splice(index,1);
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
    //编辑食材后提交
      editSubmit(val){
        if(val==""){
            this.$alert("食材不可为空", '提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            })
        }else {
          if(this.selected.length>2){
            this.selected= this.foods.foodtype
          }
          foodupdate(this.foods.foodid,this.foods.foodname,this.selected).then(res=>{
            this.selected="";
            this.foods.foodname="";
            if(res.code==200){
              this.editnew = false;
              this.getnewdata();
            }
            if(res.code==500){
              // this.selected = this.options[this.foods.foodtype-1].label;
              this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
              })
            }

          })
        }

      },

      //搜索
      filtrate(){

      }
  }
}
</script>

<style lang = "scss" scoped>
.food{
    .search{
        margin-top: 10px;
        button{
           margin-left: -5px;
           margin-top: -2px;
        }
    }
}
.food_name{
  width: 220px;
}
</style>
