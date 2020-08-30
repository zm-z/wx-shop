//Page Object
import { request } from "../../request/index.js";
Page({
  data: {
    //轮播图数组
    swiperList:[],
    //导航数组
    cateList:[],
    //楼层
    floorList:[],
  },
  //options(Object)
  onLoad: function(options){
    //轮播图(云开发)
    // const db=wx.cloud.database();
    // const swiper=db.collection('table');
    // swiper.get().then(res=>{
    //   this.setData({
    //     swiperList:res.data
    //   })
    // })
    // .catch(err=>{
    //   console.log(err)
    // });

    //外部api
    //轮播图
    var _this=this
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        _this.setData({
          swiperList:res.data.message
        })
      }
    });

    //分类导航
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        _this.setData({
          cateList:res.data.message
        })
      }
    });

    //楼层分类
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        _this.setData({
          floorList:res.data.message
        })
      }
    });
  },
  

  onReady: function(){
    
  },
  onShow: function(){
    
  },
  onHide: function(){

  },
  onUnload: function(){

  },
  onPullDownRefresh: function(){

  },
  onReachBottom: function(){

  },
  onShareAppMessage: function(){

  },
  onPageScroll: function(){

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){

  }
});