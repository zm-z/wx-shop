// pages/goods_list/index.js
import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      },
    ],
    goodList:[],
  },
  //接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  //总页数
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid;
    this.getGoodsList();
  },

  //获取商品数据
   getGoodsList(){
    const db=wx.cloud.database();
    const images=db.collection('swiperdata');
    images.get({data:this.QueryParams}).then(res=>{
    //总条数
    const total=res.data[4].message.total
    //总页数
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize)
    this.setData({
      goodList:[...this.data.goodList,...res.data[4].message.goods]
    })
    wx.stopPullDownRefresh()
    })
    .catch(err=>{
      console.log(err)
    }); 
  },
  //标题点击事件
  subnavTap(e){
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
   //页面上划，触底事件
   onReachBottom(){
    //判断是否有下一页
    if(this.QueryParams.pagenum>=this.totalPages){
      //没有下一页
      wx.showToast({
        title: '没有下一页数据',
      });
    }else{
      //有下一页
      this.QueryParams.pagenum++
      this.getGoodsList()
    }
  },
  //下拉刷新
  onPullDownRefresh(){
    this.setData({
      goodList:[]
    })
    this.QueryParams.pagenum=1
    this.getGoodsList()
  },

})