let ajaxTimes=0
export const request=(params)=>{
    ajaxTimes++
    //定义公共的Url
    const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1"
    //显示加载中
    wx.showLoading({
        title: "加载中",
        mask: true,
    });
    return new Promise((resolve,reject)=>{
        wx.request({
          ...params,
          url:baseUrl+params.url,
          success:(result)=>{
              resolve(result)
          },
          fail:(err)=>{
              reject(err)
          },
        complete:()=>{
            ajaxTimes--
            if(ajaxTimes==0){
                //关闭图标
                wx.hideLoading();
            }
          },
        });
    })

}