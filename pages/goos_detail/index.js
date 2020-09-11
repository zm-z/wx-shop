// pages/goos_detail/index.js
import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsAll:[],
    goodsObj:{},
    //商品是否被收藏
    isCollect:false,
  },
  //商品对象
  Goodinfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages= getCurrentPages();
    let currentPage=pages[pages.length-1];
    let options=currentPage.options;
    const {goods_id}=options
    this.getGoodsDetail(goods_id)
    

  },

  //获取商品详情
    async getGoodsDetail(goods_id){
      
    // const db=wx.cloud.database();
    // const images=db.collection('swiperdata');
    // images.get().then(res=>{
    //   //接收所有商品信息
    //   this.goodsAll=res.data[4].message.goods
    //   //筛选出所要的商品信息
    //   this.goodsAll.forEach(v=>v.goods_id=goods_id)
    //   console.log(this.goodsAll);
      
    //   this.setData({
    //     goodsObj:this.goodsAll
    //   })
    // })
    // .catch(err=>{
    //   console.log(err)
    // });
    
    const res=await request({url:'/goods/detail',data:{goods_id}})
    
    this.Goodinfo=res.data.message
    //1获取缓存中商品收藏的数组
    let collect=wx.getStorageSync("collect")||[]
    //判断当前是否被收藏
    let isCollect=collect.some(v=>v.goods_id===this.Goodinfo.goods_id)
    this.setData({
      goodsObj:res.data.message,
      isCollect
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
      this.Goodinfo.checked=true
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
  },
  //收藏
  handleCollect(){
    let isCollect=false
    //获取缓存在的收藏对戏数组
    let collect=wx.getStorageSync("collect")||[]
    //判断商品是否存在
    let index=collect.findIndex(v=>v.goods_id===this.Goodinfo.goods_id)
    if(index!=-1){
      //表示已经收藏
      collect.splice(index,1)
      isCollect=false
      wx.showToast({
        title: '取消收藏',
        mask:true
      });
    }else{
      collect.push(this.Goodinfo)
      isCollect=true
      wx.showToast({
        title: '添加至收藏',
        mask:true
      });
    }
    //把数组存入放缓存中
    wx.setStorageSync("collect",collect)
    this.setData({
      isCollect
    })
  }
})