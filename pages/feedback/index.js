// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"体验问题",
        isActive:true
      },
      {
        id:1,
        value:"商品、商家投诉",
        isActive:false
      },
    ],
    chooseImgs:[],
    //文本域内容
    textVal:''
  },
  //外网图片路径数组
  UploadImages:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  //上传图片
  handleUpImg(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (result)=>{
        this.setData({
          chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]
        })
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  //删除指定照片
  handleRemoveImg(e){
    var index=e.currentTarget.dataset.index
    //获取照片数组
    let {chooseImgs}=this.data
    //删除照片
    chooseImgs.splice(index,1)
    this.setData({
      chooseImgs
    })
  },
  //文本框输入事件
  handleText(e){
    this.setData({
      textVal:e.detail.value
    })
  },
  //提交按钮
  handleSubmit(){
    //获取文本内容
    const {textVal,chooseImgs}=this.data
    if(!textVal.trim()){
      //不合法
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true,
      });
      return
    }
    wx.showLoading({
      title: "正在上传",
      mask: true,
    });
    //s上传到专门的路径,不支持多个文件同时上传，遍历数组，挨个上传
    chooseImgs.forEach((v,i)=>{
      wx.uploadFile({
        url: 'https://images.ac.cn/Home/Index/UploadAction/',
        filePath:v ,
        name:"file" ,
        formData: {},
        success: (result)=>{
          console.log(result);
          let url=JSON.parse(result.data).url;
          this.chooseImgs.push(url)
          //所有图片上传后才触发
          if(i==chooseImgs.length-1){
            //都提交了
            //页面重置
            wx.hideLoading();
            this.setData({
              textVal:'',
              chooseImgs:[]
            })
            //返回上一个页面
            wx.navigateBack({
              delta: 1
            });
          }
        }
      });
    })    
  },
})