// pages/goos_detail/index.js
import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  //商品对象
  Goodinfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id}=options
    this.getGoodsDetail(goods_id)
  },

  //获取商品详情
  async getGoodsDetail(goods_id){
    const res=await request({url:'/goods/detail',data:{goods_id}})
    this.Goodinfo=res.data.message
    this.setData({
      goodsObj:res.data.message
    })
  },
  //点击轮播图，放大预览
  subnavTap(e){
    //1构造要预览的照片数组
    const urls=this.Goodinfo.pics.map(v=>v.pics_mid)
    //接收传过来的图片地址
    const current=e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls,
    });
  },

  //点击加入购物车
  subnavTap1(){
    //1获取缓存中的购物车数组
    let cart=wx.getStorageSync("cart")||[];
    //2判断商品对象是否存在购物车中
    let index=cart.findIndex(v=>v.goods_id===this.Goodinfo.goods_id)
    if(index===-1){
      //不存在
      this.Goodinfo.num=1;
      cart.push(this.Goodinfo)
    }else{
      //商品已经存在
      cart[index].num++;
    }
    //把购物车重新添加到缓存中
    wx.setStorageSync("cart", cart);
    //弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      //防止用户手抖，1.5s后才能点击
      mask:true
    });
  }
})