<template>
  <div class="official">
        <div class="layui-btn-group demoTable">
        <button class="layui-btn" data-type="getCheckData" @click="addopen">添加官方菜谱</button>
        <!-- <button class="layui-btn" data-type="getCheckLength">获取选中数目</button>
        <button class="layui-btn" data-type="isAll">验证是否全选</button> -->
        </div>

        <div class="layui-form">
     <table class="layui-table" >
            <!-- <colgroup>
            <col width="120">
            <col width="100">
            <col width="150">
            <col width="380">
            <col>
            </colgroup> -->
            <thead>
            <tr>
                <th>菜名</th>
                <th>流派</th>
                <th>菜谱标签</th>
                <th>菜谱介绍</th>
                <th>推荐分数</th>
                <th>上传时间</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in getdata" :key="index">
                <td>{{item.cbname}}</td>
                <td>
                {{item.factionsid==1?'川':item.factionsid==2?'鲁':item.factionsid==3?'粤':item.factionsid==4?'闽':item.factionsid==5?'苏':item.factionsid==6?'浙':item.factionsid==7?'湘':item.factionsid==8?'徽':'家常'}}
                系
                </td>
                <td>{{item.cbtag.replace(/\$/g,'、')}}</td>
                <td><p class="text">{{item.cbtext}}</p></td>
                <!-- <td><el-rate v-model="item.cbscore" disabled></el-rate></td> -->
                <td>{{item.cbscore}}</td>
                <td>{{item.createtime}}</td>
                <td>
                    <a class="layui-btn layui-btn-primary layui-btn-xs" @click="cpinfo(item.cookbookid)" >查看</a>
                    <a class="layui-btn layui-btn-xs" @click="cpedit(item.cookbookid)" >编辑</a>
                    <a class="layui-btn layui-btn-danger layui-btn-xs">删除</a>
                </td>
            </tr>
            </tbody>
        </table>
    <div class="block">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="present"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="sizes"
        layout="total,sizes, prev, pager, next"
        :total="total">
        </el-pagination>
    </div>
</div>
 <el-dialog title="添加官方菜谱" id="el_add_box"
 :visible.sync="addDialogFormVisible"
:before-close="closeDialog"
 :modal-append-to-body = "false">
    <el-form :model="addForm" label-width="80px" :rules="rules" ref="addUserForm">
        <el-form-item label="菜谱名称" prop="cbname">
        <el-input v-model="addForm.cbname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择流派" prop="faction">
         <el-select v-model="addForm.factionsid" placeholder="请选择流派">
            <el-option
            v-for="item in options"
            :key="item.factionsid"
            :label="item.factionsname+'派'"
            :value="item.factionsid">
            </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="菜谱标签" prop="cbtag">
            <el-input v-model="addForm.cbtag" auto-complete="off" class="cbtag"></el-input>
            <i class="el-icon-circle-plus" @click="addtag"></i>
            <el-tag
                v-for="tag in tags"
                :key="tag.name"
                @close="handleClose(tag)"
                closable
                :type="tag.type">
                {{tag.name}}
                </el-tag>
        </el-form-item>
      <el-form-item label="缩略图" prop="cbimg" >
        <el-upload
          class="breviaryimg"
          action="http://up-z2.qiniup.com"
          :on-success="handleSuccess3"
          :before-upload="beforeUpload3"
          :data="uploadToken"
          :on-error="handleError"
          :show-file-list="false"
        >
          <img v-if="breviaryUrl" :src="breviaryUrl">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
        <el-form-item label="默认图" prop="cbimg">
            <el-upload
            class="subimg defaultImg"
            action="http://up-z2.qiniup.com"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
            :data="uploadToken"
            :on-error="handleError"
            :show-file-list="false"
            >
            <img v-if="url" :src="url">
            <i v-else class="el-icon-plus"></i>
        </el-upload>
        </el-form-item>
        <el-form-item label="菜谱介绍" prop="cbtext">
            <el-input type="textarea" cols="60" rows="3" v-model="addForm.cbtext"></el-input>
        </el-form-item>
        <el-form-item label="详情图" prop="cbimg">
         <div class="infoimg">
        <div class="imgs" v-for="(item,index) in imageUrl" :key="index"
         v-dragging="{ item: item, list: imageUrl, group: 'item' }"  >
            <img :src="item.url" alt="">
            <i class="el-icon-close" @click="del(index)" ></i>
        </div>
        <el-upload
            ref="upload"
            action="http://up-z2.qiniup.com"
            :on-success="handleSuccess2"
            :on-change="beforeUpload2"
            :on-error="handleError"
            :data="uploadToken"
            :before-upload="beforeup2"
             multiple
            :on-remove="handleRemove"
            :on-preview="handlePictureCardPreview"
            :show-file-list="false"
            list-type="picture-card">
            <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
            <i class="el-icon-plus"></i>
        </el-upload>
        </div>

        <!-- <el-dialog class="preview-modal" :visible.sync="imgVisible" append-to-body>
        <img width="100%" :src="imageUrl" alt="photo">
        </el-dialog> -->
        </el-form-item>
        <el-form-item label="菜谱分数" prop="cbscore">
            <div class="block">
                <el-input v-model="addForm.cbscore"></el-input>
            </div>
        </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer dialog-footer_add" >
        <el-button @click="addcancel" >取 消</el-button>
        <el-button type="primary" @click="addSubmit(addForm)" >提 交</el-button>
      </div>
</el-dialog>

<el-dialog :title="infocook.cbname"
  class="info"
 :visible.sync="infomenu"
 :modal-append-to-body = "false">
    <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
          <div class="cbthumbimg">
              <img :src="infocook.cbthumbimg" alt="">
          </div>
          <div class="cbtext">
              <p>{{infocook.cbtext}}</p>
          </div>
          <div class="btn">
              <button>分解流程</button>
              <button>语音帮厨</button>
          </div>
          <div class="cbimg" v-for="(item,index) in imageUrl" :key="index">
              <img :src="item.url" alt="">
          </div>
      </div></el-col>
    </el-row>
</el-dialog>


<el-dialog title="修改官方菜谱" id="el-box"
 :visible.sync="editrecipe"
 :modal-append-to-body = "false">
    <el-form :model="addForm" label-width="80px">
        <el-form-item label="菜谱名称">
        <el-input v-model="infocook.cbname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择流派">
         <el-select v-model="infocook.factionsid" placeholder="请选择流派">
            <el-option
            v-for="item in options"
            :key="item.factionsid"
            :label="item.factionsname+'派'"
            :value="item.factionsid">
            </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="菜谱标签">
            <el-input v-model="addForm.cbtag" auto-complete="off" class="cbtag"></el-input>
            <i class="el-icon-circle-plus" @click="addtag"></i>
            <el-tag
                v-for="tag in tags"
                :key="tag.name"
                @close="handleClose(tag)"
                closable
                :type="tag.type">
                {{tag.name}}
                </el-tag>
        </el-form-item>
      <el-form-item label="缩略图" prop="cbimg" >
        <el-upload
          class="breviaryimg"
          action="http://up-z2.qiniup.com"
          :on-success="handleSuccess4"
          :before-upload="beforeUpload3"
          :data="uploadToken"
          :on-error="handleError"
          :show-file-list="false"
        >
          <img v-if="infocook" :src="infocook.cbthumbnailimg">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
        <el-form-item label="默认图" prop="cbimg">
            <el-upload
            class="subimg Editdefaultimg"
            action="http://up-z2.qiniup.com"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
            :data="uploadToken"
            :on-error="handleError"
            :show-file-list="false"
            >
            <img v-if="infocook" :src="infocook.cbthumbimg">
            <i v-else class="el-icon-plus"></i>
        </el-upload>
        </el-form-item>
        <el-form-item label="菜谱介绍" prop="cbimg">
            <el-input type="textarea" cols="60" rows="3" v-model="infocook.cbtext"></el-input>
        </el-form-item>
        <el-form-item label="详情图" prop="cbimg">
         <div class="infoimg">
        <div class="imgs" v-for="(item,index) in imageUrl" :key="index"
         v-dragging="{ item: item, list: imageUrl, group: 'item' }"  >
            <img :src="item.url" alt="">
            <i class="el-icon-close" @click="del(index)"></i>
        </div>
        <el-upload
            action="http://up-z2.qiniup.com"
            :on-success="handleSuccess2"
            :on-change="beforeUpload2"
            :before-upload="beforeup2"
            :on-error="handleError"
            :data="uploadToken"
             multiple
            :on-remove="handleRemove"
            :on-preview="handlePictureCardPreview"
            :show-file-list="false"
            list-type="picture-card">
            <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
            <i class="el-icon-plus"></i>
        </el-upload>
        </div>

        <!-- <el-dialog class="preview-modal" :visible.sync="imgVisible" append-to-body>
        <img width="100%" :src="imageUrl" alt="photo">
        </el-dialog> -->
        </el-form-item>
        <el-form-item label="菜谱分数" prop="cbscore">
            <div class="block">
                <el-input v-model="infocook.cbscore"></el-input>
            </div>
        </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer dialog-footer_edit">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="editSubmit">提交</el-button>
    </div>
</el-dialog>

  </div>
</template>
<script>
import * as qiniu from "qiniu-js";
import md5 from 'js-md5';
import {upload,getall,faction,add,getcook,update,getcount} from '@/api'

export default {
        inject:['reload'],
  data () {
    return {
      clientHeight:'',//获取屏幕总高度
      scrolleditObj:'',//div元素滚动的区域
      scrolladdObj:'',
      scrollTop:'',//div到头部的距离
      scrollHeight:'',//滚动条的总高度
        addDialogFormVisible:false, //添加模态窗
        infomenu:false,     //查看模态窗
        editrecipe:false,//修改模态窗
        tags: [
        ],
        tag:'',        //标签
        options:[], //流派
        upkey:'',       //上传
        uploadToken:{
            token:'',
            key:''
              },
        url:'',      //默认图
        breviaryUrl:'',
        // EditbreviaryUrl:'',
        imageUrl: [], //详情图
        imgVisible:false,
        filelist:[],       //上传列表
        suffix:'',         //图片后缀
        addForm: {
            cbname: '',
            faction: '',
            cbtag:'',
            cbhumbimg:'',
            cbtext:'',
            cbimg:'',
            cbscore: '',
        },
        strtag:'',     //切割好的标签
        strimg:'',      //切割好的路径
        isup:1,  //标记
        infocook:[],        //存储id获取菜谱
        rules: {
            cbname: [{
                required: true, message: '菜谱名称不能为空', trigger: 'blur'
            }],
            cbtag: [{
                required: true, message: '请输入菜谱标签', trigger: 'blur'
            }],
            faction: [{
                required: true, message: '请选择流派', trigger: 'blur'
            }],
            cbimg: [{
                required: true, message: '不能为空'
            }],
            cbtext: [{
                required: true, message: '菜谱介绍不能为空'
            }],
            cbimgs: [{
                required: true, message: '请上传详情图'
            }],
            cbscore: [{
                required: true, message: '请打分'
            }],
        },
        getdata:[],
        total:this.present+1,     //总页数
        // currentPage2: 3,  //分页
        sizes:10,       //每页多少
        present:1,    //当前页
        type:''

    }
  },
 mounted(){
    //添加屏幕滚动事件
   window.addEventListener('scroll', this.handleScroll, true);

 if(window.sessionStorage.length!==0){
  window.sessionStorage.present? (this.present=parseInt(window.sessionStorage.present)):1;
  window.sessionStorage.sizes? (this.sizes=parseInt(window.sessionStorage.sizes)):10;
 }
   else{
     this.present=1;
     this.sizes=10;
   }

   this.getnewdata();

    //  拖动
      this.$dragging.$on('dragged', ({ value }) => {
      console.log(value)
    //   console.log(value.list)
    //   console.log(value.otherData)
    })
    //页面加载 拉去token

        upload(2, 1).then(res => {
        this.uploadToken.token = res.data.token;
        this.upkey = res.data.key;
        //   console.log(this.upkey)

        });
    //   this.qiniu();
 },
 methods:{
     //屏幕滚动
   handleScroll(){
     // this.scroll =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
     // console.log(this.scroll)

     // 设备可见屏幕高度
     this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
     // console.log(clientHeight);

     // 滚动区域
     this.scrolleditObj = document.getElementById('el-box');

     this.scrolleaddObj = document.getElementById('el_add_box');
     // console.log(this.scrolleditObj.scrollTop);
     // console.log(this.scrolleaddObj.scrollTop);

     // div 到头部的距离
     // this.scrollTop = this.scrolleditObj.scrollTop||0;
     // console.log(this.scrollTop);

     // 滚动条的总高度
    // this.scrollHeight = this.scrolleditObj.scrollHeight;
     // console.log(this.scrollHeight);
   },
     //获取列表
     getnewdata(){
          //  菜谱总数
            getcount(1).then(res=>{
                this.total = res.data
            })
            //获取官方菜谱
            getall(this.present,this.sizes).then(res=>{
                this.getdata = res.data
            //   数字转换
                // nim==1?'川':nim==2?'鲁':nim==3?'粤':nim==4?'闽':nim==5?'苏':nim==6?'浙':nim==7?'湘':nim==8?'徽':'家常'
            })

            //流派
            faction(5).then(res=>{
                this.options = res.data
            })

     },

    //  分页
      handleSizeChange(val) {
         this.sizes = val
          getall(this.present,val).then(res=>{
            if(res.code===200) {
              this.getdata = res.data;
              window.sessionStorage.setItem('sizes', val);
            }

      })

      },
      handleCurrentChange(val) {
          this.present = val
          getall(val,this.sizes).then(res=>{
            if(res.code===200){
              this.getdata = res.data;
              window.sessionStorage.setItem('present', val);
            }
      });
    },

     //增加标签
     addtag(){
       if(this.addForm.cbtag){
            this.tags.push({name:this.addForm.cbtag})
            this.addForm.cbtag = ''
            let str=''
            this.tags.forEach(item => {
            str+='$'+item.name
            this.tag=str
          });
       }
     },
     handleClose(tag) {
         this.tags.splice(this.tags.indexOf(tag), 1);
          let str=''
          this.tags.forEach(item => {
            str+='$'+item.name
            this.tag=str
            });
         console.log(this.tag)
      },
   closeDialog(done){
     this.addDialogFormVisible = false;
     this.addForm.cbname='';
     this.addForm.factionsid='';
     this.tag='';
     this.url='';
     this.addForm.cbtag='',
       this.addForm.cbhumbimg='';
     this.breviaryUrl='';
     this.addForm.cbtext='';
     this.addForm.cbimg='';
     this.addForm.cbscore='';
   },
     //手动上传
      submitUpload() {
        this.$refs.upload.submit();
      },
      addopen(){
          this.addDialogFormVisible=true;
          this.tags = []
          this.imageUrl=[];
      },
        del(index){
            this.imageUrl.splice(index,1)
        },
      //添加菜谱
     addSubmit(all){
        //  this.isup =0
         var This = this
         let str=''

            this.imageUrl.forEach(item=>{
                // console.log(item.url)
                str+=`$${item.url}`
            })
                this.addForm.cbimg=str.substr(1);

        setTimeout(function(){
             add(This.addForm.cbname,This.addForm.factionsid,This.tag.substr(1),This.addForm.cbhumbimg,This.breviaryUrl,This.addForm.cbtext,This.addForm.cbimg,This.addForm.cbscore).then(res=>{
               console.log(res)
               if(res.code==200){
               This.addDialogFormVisible = false;      // console.log(this.scrolleaddObj.scrollTop);
                 This.reload();
                 // getall(this.present,this.sizes).then(res=>{
                 //   console.log(res.data);
                 // })
                 This.addForm.cbname='';
                   This.addForm.factionsid='';
                   This.tag='';
                   This.addForm.cbhumbimg='';
                   This.breviaryUrl='';
                   This.addForm.cbtext='';
                   This.addForm.cbimg='';
                   This.addForm.cbscore='';
                 This.url='';
                 This.addForm.cbtag='';
                 //刷新获取官方菜谱及 总条数 流派
                 This.getnewdata();
                 This.scrolleaddObj.scrollTop=0;
               }
               else if(res.code==500){
                 This.$message({
                   message: '菜谱已存在或上传错误!',
                   type: 'error',
                   duration:1000,
                   center: true
                 })
               }
               else{
               This.$message({
                    message: '请补全菜谱信息',
                    type: 'warning',
                    duration:1000,
                    center: true
                   })
               }
         }
         )
      },200)

     },
   //添加菜谱取消按钮
   addcancel(){
     this.addDialogFormVisible = false;
     this.addForm.cbname='';
     this.addForm.factionsid='';
     this.tag='';
     this.url='';
     this.addForm.cbtag='',
     this.addForm.cbhumbimg='';
     this.breviaryUrl='';
     this.addForm.cbtext='';
     this.addForm.cbimg='';
     this.addForm.cbscore='';
     console.log(this.scrolleaddObj.scrollTop);
     this.scrolleaddObj.scrollTop=0;
   },
     //查看菜谱详情
     cpinfo(index) {
       this.imageUrl=[];
         this.infomenu = true;
         getcook(index).then(res=>{
             this.infocook = res.data
              let strurl= res.data.cbimg.split("$")
                strurl.forEach(v=>{
                    this.imageUrl.push({url:v})
                })
         })

     },
     //编辑菜谱
     cpedit(index){
       // document.body.scrollTop = 0;
       // // Firefox
       // document.documentElement.scrollTop = 0;
       // // Safari
       // window.pageYOffset = 0;
         this.editrecipe = true;
        getcook(index).then(res=>{
            this.tags=[];       //标签
            this.imageUrl=[];   //详情图
            this.infocook = res.data       //存储

          // console.log(this.infocook);
          //    console.log(res.data.factionsid)
            let str = res.data.cbtag.split("$")
            str.forEach(v=>{
                this.tags.push({name:v})
            })

            let strurl= res.data.cbimg.split("$")
            strurl.forEach(v=>{
                this.imageUrl.push({url:v})
            })
        })
     },
    //编辑后提交
    editSubmit(){
        // 标签
        let str=''
        let strurl =''
        this.tags.forEach(item => {
            str+='$'+item.name
            this.strtag=str
            });
        // 详情图
        this.imageUrl.forEach(item=>{
            strurl+='$'+item.url
        })
        update(this.infocook.cookbookid,this.infocook.cbname,this.infocook.factionsid,this.strtag.substr(1),this.infocook.cbthumbimg,this.infocook.cbthumbnailimg,this.infocook.cbtext,strurl.substr(1),this.infocook.cbscore).then(res=>{
            if(res.code==200){
              this.getnewdata();
              this.editrecipe = false;
              this.scrolleditObj.scrollTop=0;
            }
        })

        // location.reload
        // this.reload()
    },
   //取消编辑
   cancel(){
     this.editrecipe = false
     this.scrolleditObj.scrollTop=0;
   },
        beforeUpload (file) {
            let newdate =Date.parse(new Date())
            newdate = (md5(newdate.toString()))
            let suffix = file.name
            let arr = suffix .split('.');
            this.suffix =arr[arr.length-1]

            let url = `${this.upkey}${newdate}.${this.suffix}`

            this.uploadToken.key=url

            // console.log(this.uploadToken)
            return this.uploadToken
        },
   beforeUpload3 (file) {
     let newdate =Date.parse(new Date())
     newdate = (md5(newdate.toString()))
     let suffix = file.name
     let arr = suffix .split('.');
     this.suffix =arr[arr.length-1]

     let url = `${this.upkey}${newdate}.${this.suffix}`

     this.uploadToken.key=url

     // console.log(this.uploadToken)
     return this.uploadToken
   },

   handleSuccess3(res, file, fileList){
     let url = `http://img.ichushen.cn/${res.key}`
     this.breviaryUrl= url
     console.log(res);
   },
   handleSuccess4(res, file, fileList){ //缩略图修改成功
     let url = `http://img.ichushen.cn/${res.key}`
     this.infocook.cbthumbnailimg=url;
     console.log(this.infocook.cbthumbnailimg)
   },
        beforeup2(file){
             let newdate =Date.parse(new Date());
            newdate = (md5(file.uid.toString()))
            let suffix = file.name
            let arr = suffix .split('.');
            this.suffix =arr[arr.length-1]
            let url = `${this.upkey}${newdate}.${this.suffix}`

             this.uploadToken.key= url
             return this.uploadToken
        },
        // cheg
        beforeUpload2(file) {
            // console.log(file.uid)
            // if(this.isup==1){
            //   this.imageUrl.push({url:file.url})
            // }
        },
       handleError(res) {   //显示错误
             this.isup =0
            console.log(res)
        },
        handleSuccess (res, file, fileList) {
           // let url = `http://img.ichushen.cn/${res.key}`
           //  this.addForm.cbhumbimg= url
           //  this.infocook.cbthumbimg =url
          this.url = `http://img.ichushen.cn/${res.key}`
           this.addForm.cbhumbimg=this.url
          this.infocook.cbthumbimg =this.url
        },
         handleSuccess2(res, file, fileList) {
             this.isup =0
             let url = `http://img.ichushen.cn/${res.key}`
           this.imageUrl.push({url:url})
        },
         handleRemove(file, fileList) {
        console.log(file, fileList);
      },
        handlePictureCardPreview(file) {
        //    this.imageUrl= `http://img.yzlkeji.com/${res.key}`
        //     this.imgVisible = true;
        }

 },
  created() {
    // window.scrollTo(0,0);
  }
}
</script>

<style lang="scss">
.official{
  .breviaryimg{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100px;
    height: 100px;
    text-align: center;
    &:hover{
      border-color: #409EFF;
    }
    .el-icon-plus{
      font-size: 25px;
      width: 100px;
      display: block;
     line-height: 100px;
      color: #8c939d;
    }
    img{
      width: 100px;
      height: 100px;
    }
  }

    .subimg{
        .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        }
        .el-upload:hover {
            border-color: #409EFF;
        }
        .el-icon-plus {
            font-size: 28px;
            color: #8c939d;
            width: 400px;
            height: 250px;
            line-height: 80px;
            text-align: center;
          display: table-cell;
          vertical-align: middle;
          background: white;
        }
        img {
            width: 150px;
            height: 80px;
            display: block;
        }

    }
  .Editbreviaryimg{
    width: 100px;
    height: 100px;
    img{
      width: 100%;
      height: 100%;

    }
  }
  .defaultImg{
    /*width: 400px;*/
    /*height: 250px;*/
    /*display: flex;*/
    margin-bottom: 5px;;
    flex-direction: row-reverse;

    /*overflow: hidden;*/
    img {
      width: 100%;
      height: 100%;
      display: inline-block;

      position: relative;
    }

  }
  .Editdefaultimg{

    overflow: hidden;

    img{
      width: 100%;
      height: 100%;

    }
  }

    // add样式
    .el-form{
         .el-form-item__label{
           text-align: left;
       }
         .block{
             width: 150px;
         }
    }




   .infoimg{
    //    height: 800px;
       width: 400px;
       .imgs{
           display: flex;
           margin-bottom: 5px;;
           flex-direction: row-reverse;
           img{
           width: 100%;
           height: 100%;
           position: relative;
          }
          .el-icon-close{
              position: absolute;
              font-size: 35px;
          }
       }
       .el-upload{
           position: relative;
           width: 400px;
           height: 250px;
          .el-icon-plus{
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%,-50%);
          }
      }

   }
    .subup{
            position: absolute;
            top: 0;
            left: 150px;
        }
   .preview-modal{
   }
   .text{
       width: 380px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap
   }
   .el-dialog__footer{
       margin-top: -50px;
   }
  .cbtag.el-input{
      width: 150px;
  }
  .el-icon-circle-plus{
      cursor: pointer;
      transform: translateY(5px);
      font-size: 30px;
  }

//    查看菜谱样式
 .info{
     .el-dialog__title{
         left:50%;
         position: absolute;
         transform: translateX(-52%);
     }
     .el-row{
     }
     .grid-content{
        //   background: pink;
        .btn{
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
            button{
                width: 44%;
                height: 40px;
                background: #599AC0;
                color: #ffffff;
                border: none;
                border-radius: 10px;
                }
            }
            .cbtext{
                margin-top: 20px;
                margin-bottom: 120px;
                font-size: 18px;
                font-weight:bold;
            }
            img{
                width: 100%;
            }
            .cbimg{
                img{
                    margin-bottom: 20px;
                }
            }
           }
          }


}

//   提示 框
  .el-message{
       top:50%!important;
   }
.dialog-footer{
display: block;

}
   .dialog-footer_edit,.dialog-footer_add{
     display: block;
     position: fixed;
     height: 70px;
     bottom:20px;
     right: 16.5%;
   }

</style>
