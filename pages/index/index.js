//index.js
/***
 * @author antony
 * @date 20160924
 * @desc  广告页面
 *       
 */
var app = getApp()
Page({
  data: {
    motto: '微信小程序demo',
    endTime:3,  //广告启动时间
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
   onShow: function () {
      console.log("onRealy");
      var _this = this ;
     //广告页，三秒跳到首页
      var endTimesInterval = setInterval(function(){
                var endTime =_this.data.endTime;
                    if(endTime>0){
                      endTime-- ;
                      _this.setData({
                          endTime: endTime  
                        });
                     
                    }else{
                       clearInterval(endTimesInterval);
                           wx.redirectTo({
                            url: '../appIndex/appIndex'
                          })
                          
                    }
     },1000);
  
  }
})
