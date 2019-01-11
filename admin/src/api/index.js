import axios from 'axios'

//设置请求的跟路径
const baseURL = "http://sysapi.ichushen.cn"
axios.defaults.baseURL = baseURL

// 请求拦截器,给所有的请求加上token
//  axios.interceptors.request.use(function(config) {
//       // 取出localStorage中存储的token值
//      let token = localStorage.getItem('mytoken')
//      // 设置到请求头中 Access-Token这个名字是后台规定的
//         config.headers['Access-Token'] = token
//         return config
//  })


//获取上传凭证
export const upload = (status,type)=>{
    return axios.post(`/common/uploadToken?status=${status}&type=${type}`).then(res=>res.data)
}

//获取官方菜谱.
export const getall = (pagenum,pagesize)=>{
    return axios.post(`/cookbook/getall?pagenum=${pagenum}&pagesize=${pagesize}`).then(res=>res.data)
}

//获取所有流派
export const faction = (userid)=>{
    return axios.post(`/faction/getall?userid=${userid}`).then(res=>res.data)
}

//添加官方菜谱
export const add = (cbname,factionsid,cbtag,cbthumbimg,cbthumbnailimg,cbtext,cbimg,cbscore)=>{
    return axios.post(`/cookbook/add?cbname=${cbname}&factionsid=${factionsid}&cbtag=${cbtag}&cbthumbimg=${cbthumbimg}&cbthumbnailimg=${cbthumbnailimg}&cbtext=${cbtext}&cbimg=${cbimg}&cbscore=${cbscore}`).then(res=>res.data)
}
//获取官方菜谱总数
export const getcount = (userid)=>{
    return axios.post(`/cookbook/getcount?userid=${userid}`).then(res=>res.data)
}


//根据id获取官方菜谱
export const getcook = (cookbookid)=>{
    return axios.post(`/cookbook/getcookbookbyid?cookbookid=${cookbookid}`).then(res=>res.data)
}

//修改官方菜谱
export const update = (cookbookid,cbname,factionsid,cbtag,cbthumbimg,cbthumbnailimg ,cbtext,cbimg,cbscore)=>{
    return axios.post(`/cookbook/update?cookbookid=${cookbookid}&cbname=${cbname}&factionsid=${factionsid}&cbtag=${cbtag}&cbthumbimg=${cbthumbimg}&cbthumbnailimg=${cbthumbnailimg }&cbtext=${cbtext}&cbimg=${cbimg}&cbscore=${cbscore}`).then(res=>res.data)
}

//获取食材列表
export const getfoods= (pagenum,pagesize)=>{
    return axios.post(`/food/getall?&pagenum=${pagenum}&pagesize=${pagesize}`).then(res=>res.data)
}

//食材总数
export const foodcount = (cookbookid)=>{
    return axios.post(`/food/getcount?cookbookid=${cookbookid}`).then(res=>res.data)
}

//分类获取食材列表
export const getfood = (foodtype,pagenum,pagesize)=>{
    return axios.post(`/food/getall?foodtype=${foodtype}&pagenum=${pagenum}&pagesize=${pagesize}`).then(res=>res.data)
}

//食材搜索
export const search = (foodname)=>{
    return axios.post(`/food/search?foodname=${foodname}`).then(res=>res.data)
}

//添加食材
export const addfood = (foodname,foodtype)=>{
    return axios.post(`/food/add?foodname=${foodname}&foodtype=${foodtype}`).then(res=>res.data)
}
//修改食材
export const foodupdate = (foodid,foodname,foodtype)=>{
    return axios.post(`/food/update?foodid=${foodid}&foodname=${foodname}&foodtype=${foodtype}`).then(res=>res.data)
}
//删除食材
export const fooddelete = (foodid)=>{
  return axios.post(`/food/delete?foodid=${foodid}`).then(res=>res.data)
}
//获取调料列表
export const condiment= (pagenum,pagesize)=>{
    return axios.post(`/condiment/getall?pagenum=${pagenum}&pagesize=${pagesize}`).then(res=>res.data)
}

export const condiments= (condimenttype,pagenum,pagesize)=>{
    return axios.post(`/condiment/getall?condimenttype=${condimenttype}&pagenum=${pagenum}&pagesize=${pagesize}`).then(res=>res.data)
}

//调料总数
export const condimentcount = (cookbookid)=>{
    return axios.post(`/condiment/getcount?cookbookid=${cookbookid}`).then(res=>res.data)
}

//添加调料
export const addcondiment= (condimentname,condimenttype)=>{
    return axios.post(`/condiment/add?condimentname=${condimentname}&condimenttype=${condimenttype}`).then(res=>res.data)
}

//修改调料
export const condimentupdate = (condimentid,condimentname,condimenttype)=>{
    return axios.post(`/condiment/update?condimentid=${condimentid}&condimentname=${condimentname}&condimenttype=${condimenttype}`).then(res=>res.data)
}

//删除调料
export const condimentdelete = (condimentid)=>{
  return axios.post(`/condiment/delete?condimentid=${condimentid}`).then(res=>res.data)
}

//调料搜索
export const searchcondiment = (condimentname)=>{
    return axios.post(`/condiment/search?condimentname=${condimentname}`).then(res=>res.data)
}

//获取辅料列表
export const excipients= (pagenum,pagesize)=>{
    return axios.post(`/excipients/getall?pagenum=${pagenum}&pagesize=${pagesize}`).then(res=>res.data)
}

//获取辅料总数
export const excipientscount = (cookbookid)=>{
    return axios.post(`/excipients/getcount?cookbookid=${cookbookid}`).then(res=>res.data)
}

//添加 辅料
export const addexcipients = (excipientsname )=>{
    return axios.post(`/excipients/add?excipientsname=${excipientsname}`).then(res=>res.data)
}
//修改辅料
export const updateexcipients= (excipientsid,excipientsname)=>{
    return axios.post(`/excipients/update?excipientsid=${excipientsid}&excipientsname=${excipientsname}`).then(res=>res.data)
}
//辅料搜索
export const searchexcipients = (excipientsname)=>{
    return axios.post(`/excipients/search?excipientsname=${excipientsname}`).then(res=>res.data)
}
//删除辅料
export const excipientsdelete = (excipientsid)=>{
  return axios.post(`/excipients/delete?excipientsid=${excipientsid}`).then(res=>res.data)
}
// 添加菜谱分解流程步骤
export const decompositionprocess=(addtray)=>{
  return axios.post(`/process/addtray`,addtray).then(res=>res.data)
}

//添加菜谱装盘步骤

export const recipes=(addtray1)=>{
  return axios.post(`/stepfour/addtray`,addtray1).then(res=>res.data)
}


// 添加菜谱所需食材

export const addfoods=(addfood)=>{
  return axios.post(`/stepone/addfood`,addfood).then(res=>res.data)
}

//添加菜谱所需辅料
export const accessories=(addexcipient)=>{
  return axios.post(`/stepone/addexcipients`,addexcipient).then(res=>res.data)
}

//添加菜谱所需调料
export const seasoning=(addexcipients)=>{
  return axios.post(`/stepone/addcondiment`,addexcipients).then(res=>res.data)
}
//查看官方菜谱分解流程列表
export const getprocessalls=(pagenum,pagesize)=>{
  return axios.post(`/process/getprocessall?pagenum=${pagenum}&pagesize=${pagesize}`).then(res=>res.data)
}
//查看官方菜谱已有食材
export const getbookfood=(cookbookid )=>{
  return axios.post(`/stepone/getbookfood?cookbookid=${cookbookid }`).then(res=>res.data)
}
//查看官方菜谱已有调料
export const getbookcondiment=(cookbookid )=>{
  return axios.post(`/stepone/getbookcondiment?cookbookid=${cookbookid }`).then(res=>res.data)
}
//查看官方菜谱已有辅料
export const getbookexcipients=(cookbookid )=>{
  return axios.post(`/stepone/getbookexcipients?cookbookid=${cookbookid }`).then(res=>res.data)
}
//删除官方菜谱已有食材
export const delbookfood=(bfid)=>{
  return axios.post(`/stepone/delbookfood?bfid=${bfid}`).then(res=>res.data)
}
//删除官方菜谱已有调料
export const delbookcondiment=(bcid)=>{
  return axios.post(`/stepone/delbookcondiment?bcid=${bcid}`).then(res=>res.data)
}

//删除官方菜谱已有辅料
export const delbookexcipients=(beid)=>{
  return axios.post(`/stepone/delbookexcipients?beid=${beid}`).then(res=>res.data)
}
//添加菜谱烹饪步骤
export const addcooks=(addcook)=>{
  return axios.post(`/stepthree/addcook`,addcook).then(res=>res.data)
}
//查看加工所需的准备材料
export const ethandlingmaterial=(cookbookid)=>{
  return axios.post(`/steptwos/gethandlingmaterial?cookbookid=${cookbookid}`).then(res=>res.data)
}
//添加菜谱食材加工步骤
export const addhandling=(addhandlings)=>{
  return axios.post(`/steptwos/addhandling`,addhandlings).then(res=>res.data)
}
//查看官方菜谱已有加工步骤
export const getbookhandling=(cookbookid)=>{
  return axios.post(`/steptwos/getbookhandling?cookbookid=${cookbookid}`).then(res=>res.data)
}

// 删除官方菜谱已有加工步骤
export const delbookhandling=(bhid)=>{
  return axios.post(`/steptwos/delbookhandling?bhid=${bhid}`).then(res=>res.data)
}

// 添加菜谱装盘步骤
export const addtray=(addtrays)=>{
  return axios.post(`/stepfour/addtray`,addtrays).then(res=>res.data)
}
// 删除官方菜谱已有装盘步骤
export const delbookcook=(btid)=>{
  return axios.post(`/stepfour/delbookcook?btid=${btid}`).then(res=>res.data)
}
//查看官方菜谱已有装盘步骤
export const getbookcook=(cookbookid)=>{
  return axios.post(`/stepfour/getbookcook?cookbookid=${cookbookid}`).then(res=>res.data)
}
//删除官方已有烹饪步骤
export const delbookcookstep=(bcid)=>{
  return axios.post(`/stepthree/delbookcook?bcid=${bcid}`).then(res=>res.data)
}

//查看官方菜谱已有烹饪步骤
export const getbookcookstep=(cookbookid)=>{
  return axios.post(`/stepthree/getbookcook?cookbookid=${cookbookid}`).then(res=>res.data)
}

//查看官方菜谱的分解流程

export const getbookprocess=(cookbookid)=>{
  return axios.post(`/process/getbookprocess?cookbookid=${cookbookid}`).then(res=>res.data)
}




