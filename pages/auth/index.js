// pages/auth/index.js
import { request } from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime'
import {login} from '../../utils/asyncWX'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  async handleGetUserInfo(e){
   try {
      //获取用户信息
    const {encrypteData,rwaData,iv,signature}=e.detail;
    //获取小程序登录成功后的code
    const {code}=await login();
    const loginParams={encrypteData,rwaData,iv,signature,code}
    //发送请求，获取用户token
    const {token}=await request({url:"/users/wxlogin",data:loginParams,method:"post"})
    wx.setStorageSync("token",token);
    wx.navigateBack({
      delta: 1
    });
   } catch (error) {
     console.log(error);
   }
  },
})