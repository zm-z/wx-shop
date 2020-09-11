// pages/search/index.js
import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from "../../request/index";
Page({

  /**
   * 输入框绑定事件进行数据筛选
   * 1获取输入框的值
   * 2把值放回给后台
   * 3后台筛选在返回数据
   * 防抖定时器
   * 定义全局定时器id
   */
  data: {
    searchGoods: [],
    isFocus:false
  },
  Time: -1,
  //输入框的只改变，就会触发
  handleInput(e) {
    //获取输入框的值
    const { value } = e.detail
    if (!value.trim()) {
      //值不合法
      return
    }
    clearTimeout(this.Time)
    this.Time = setTimeout(() => {
      this.qsearch(value)
    }, 1000)
  },
  //发送请求
  qsearch(query) {
    const db = wx.cloud.database();
    const images = db.collection('swiperdata');
    images.get({ data: this.query }).then(res => {
      this.setData({
        isFocus:true,
        searchGoods: res.data[4].message.goods
      })
    })
  },
  handleCanle(){
    this.setData({
      isFocus:false,
      searchGoods:[]
    })
  }
})
