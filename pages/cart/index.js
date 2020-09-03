// pages/cart/index.js
import { getSetting, chooseAddress, openSetting } from '../../utils/asyncWX.js';
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    //获取缓存地址信息
    const address=wx.getStorageSync("address");
    //获取缓存的购物车商品信息
    const cart=wx.getStorageSync("cart")||[];
    //计算全选
    this.setData({
      address
    })
    this.setCart(cart)
  },
  onLoad: function () {
  },
  addresChanhge(){
    wx.getSetting({
      success: (result)=>{
        const scopeAddress=result.authSetting["scope.address"]
        if(scopeAddress===false){
          wx.openSetting({
            success: (result)=>{
            },
          });
        }else{
          wx.chooseAddress({
            success: (address)=>{
              //保存本地地址
              wx.setStorageSync("address", address);
            },
          });
        }
      },
    });
  },
  //商品选中
  handeItemChange(e){
    //获取被修改商品的id
    const goods_id=e.currentTarget.dataset.id;
    //获取购物车数组
    let {cart}=this.data;
    //找到被修改的商品
    let index=cart.findIndex(v=>v.goods_id===goods_id);
    //选中状态取反
    cart[index].checked=!cart[index].checked;
    this.setCart(cart)
  },
  //购物车选中，重新计算
  setCart(cart){
    //重新计算总价格
    let allChecked=true
    let totalPrice=0
    let totalNum=0
    cart.forEach(v => {
      if(v.checked){
        totalPrice+=v.num*v.goods_price
        totalNum+=v.num
      }else{
         allChecked=false
      }
    });
    //判断数组是否为空
    allChecked=cart.length!=0?allChecked:false
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart",cart);
  },
  //底部全选取反
  // 便利购物车数组，让数组中成员的选中状态跟着全选框状态改变而一起改变
  handeItemAllCheck(){
    //获取data中的数据
    let {cart,allChecked}=this.data;
    //修改值
    allChecked=!allChecked
    //循环cart数组，改变商品状态
    cart.forEach(v=>v.checked=allChecked)
    //把修改后的值放回缓存中
    this.setCart(cart)
  },
  //商品数量编辑
  numberChange(e){
    //获取参数
    const {operation,id}=e.currentTarget.dataset
    //获取商品数组
    let {cart}=this.data;
    //找到要修改数量的商品
    const index=cart.findIndex(v=>v.goods_id==id)
    //进行数量修改
    if(operation=='-'){
      if(cart[index].num===1){
        wx.showModal({
          title: '是否删除',
          content: '',
          showCancel: true,
          cancelText: '取消',
          cancelColor: '#000000',
          confirmText: '确定',
          confirmColor: '#3CC51F',
          success: (result) => {
            if(result.confirm){
              cart.splice(index,1)
              this.setCart(cart)
            }
          },
          fail: ()=>{},
          complete: ()=>{}
        });
      }else{
        cart[index].num-=1
      }
    }else{
      cart[index].num+=1
    }
    //将数据放回到data中
    this.setCart(cart)
  },
  //结算
  //判断有没有商品，有没有收货地址
  handlePay(){
    //判断有无收货地址
    const {address,totalNum}=this.data;
    if(!address.userName){
      wx.showToast({
        title: '请选择收货地址',
      });
    }else if(totalNum==0){
      wx.showToast({
        title: '请添加商品',
      });
    }else{
      wx.navigateTo({
        url: '/pages/pay/index',
      });
    }
  }
})