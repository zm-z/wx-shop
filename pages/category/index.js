// pages/category/index.js
import {request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单数据
    leftMenuList:[],
    //右侧商品数据
    rightContent:[],
    //被点击的左侧菜单
    currentIndex:0,
    //点击左边菜单时右侧商品出现位置top为0
    scollTop:0,
  },
  //接口类返回数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates=wx.getStorageSync("cates");
    if(!Cates){
      //不存在数据
      this.getCates()
    }else{
      //有旧的数据，定义过期时间
      if(Date.now()-Cates.time>1000*10){
        //重新发送
        this.getCates()
      }else{
        //可以使用旧的
        this.Cates=Cates.data
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        let rightContent=this.Cates[0].children;
        this.setData({
            leftMenuList,
            rightContent
        })
      }
    }
  },
  //获取分类数据
  // const db=wx.cloud.database();
  // const images=db.collection('swiperdata');
  // images.get().then(res=>{
  //   this.setData({
  //     swiperList:res.data[0].message,
  //     cateList:res.data[1].message,
  //     floorList:res.data[2].message
  //   })
  // })
  // .catch(err=>{
  //   console.log(err)
  // });
   getCates(){
    const db=wx.cloud.database();
    const images=db.collection('swiperdata');
    images.get().then(res=>{
      this.Cates=res.data[3].message
      wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
      let leftMenuList=this.Cates.map(v=>v.cat_name);
      let rightContent=this.Cates[0].children;
      this.setData({
          leftMenuList,
          rightContent
      })
    })
    .catch(err=>{
      console.log(err)
    });
    // this.Cates=res.data.message
      //把数据存储到本地存储中
      // wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
      // let leftMenuList=this.Cates.map(v=>v.cat_name);
      // let rightContent=this.Cates[0].children;
      // this.setData({
      //     leftMenuList,
      //     rightContent
      // })
  },

  //左侧菜单点击事件
  subnavTap(e){
      const {index}=e.currentTarget.dataset;
      let rightContent=this.Cates[index].children ;
      this.setData({
        currentIndex:index,
        rightContent,
        scollTop:0,
      })
  },
})