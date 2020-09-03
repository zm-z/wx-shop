// pages/cart/index.js
import { getSetting, chooseAddress, openSetting } from '../../utils/asyncWX.js';
import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from "../../request/index";
/* 1渲染的商品为购物车中被选中的商品
2微信支付
  1那些人，那些账号可以微信支付
    1企业账号
3支付按钮
 先判断缓存中有没有token
 2没有，跳转到授权页面获取
 3有。。。
*/
Page({
  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    //获取缓存地址信息
    const address=wx.getStorageSync("address");
    //获取缓存的购物车商品信息
    let cart=wx.getStorageSync("cart")||[];
    //过滤后的数组
    cart=cart.filter(v=>v.checked)
    //计算全选
    this.setData({
      address,
    })
    //重新计算总价格
    let totalPrice=0
    let totalNum=0
    cart.forEach(v => {
        totalPrice+=v.num*v.goods_price
        totalNum+=v.num
    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },
  onLoad: function () {
  },
  //支付
  // orderPay(){
  //   判断是否有token
  //   const token=wx.getStorageSync("token")
  //   if(!token){
  //     wx.navigateTo({
  //       url: '/pages/auth/index',
  //     });
  //   }else{
  //     //准备 请求头参数
  //     const header={Authorization:token};
  //     //请求体参数
  //     const order_price=this.data.totalPrice
  //     const consignee_addr=this.data.address.all;
  //     let goods=[];
  //     const cart=this.data.cart;
  //     cart.forEach(v=>goods.push({
  //       goods_id:v.goods_id,
  //       goods_number:v.num,
  //       goods_price:v.goods_price
  //     }))
  //     //准备发送请求，创建菜单
  //     const orderParams={order_price,consignee_addr,goods};
  //     const {order_number}=request({url:"/my/orders/create",method:"POST",data:orderParams,header})
  //     const {pay}=await request({url:"/my/orders/req_undefiedorder",method:"POST",header,data:{order_number}})
  //     //发起微信支付
  //     wx.requestPayment(pay)
  //     //查询后台，订单状态
  //     const res=request({url:"/my/orders/chkOrder",method:"POST",header,data:{order_number}})
  //     //手动删除已经支付的商品
  //     let newCart=wx.getStorageSync("cart")
  //     newCart=newCart.filter(v=>!v.checked);
  //     //跳转页面
  //     wx.navigateTo({
  //       url: 'pages/order/index',
       
  //     });
  //   }
  // }
})