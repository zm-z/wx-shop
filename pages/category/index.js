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
  async getCates(){
    const res=await request({url:"/categories"})
    this.Cates=res.data.message
      //把数据存储到本地存储中
      wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
      let leftMenuList=this.Cates.map(v=>v.cat_name);
      let rightContent=this.Cates[0].children;
      this.setData({
          leftMenuList,
          rightContent
      })
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})