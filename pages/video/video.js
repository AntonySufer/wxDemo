//index.js
/***
 * @author antony
 * @date 20160924
 * @desc 进入头条视频
 *       
 */
   //今日头条请求地址
var request_url ="http://www.toutiao.com/api/article/feed/?category=video&utm_source=toutiao&max_behot_time=0&max_behot_time_tmp=0&as=A135078E687F0DA";
var app = getApp()
Page({
  data: {
     loading : true,//显示loading
     imgData : [] //图片
  },
  //加载
  onLoad: function () {
      //获取数据
     this.getVideoList();
  },
  //dom
   onShow: function () {
   
  },
  //获取推荐视频数据
  getVideoList: function(type) {
       var _this = this ;
            _this.setData({
                    loading :true
              });
     
       wx.request({
        url:request_url,
        success:function(reuslt){
            var imgNewData =[];
            if(reuslt.statusCode==200){
                  imgNewData = reuslt.data.data ;
               imgNewData.forEach(function(item,index){
                 var imgUrl = item.image_url ;
                 //默认
                 if(!imgUrl){
                    imgNewData[index].image_url = "http://p1.pstatp.com/list/640x360/e900001d5dee4c22701";
                 }

               });
         
               if(type=="up"){
                imgNewData = _this.data.imgData.concat(imgNewData); 
               }else{
                imgNewData = imgNewData.concat(_this.data.imgData); 
               }

               _this.setData({
                    imgData:imgNewData,
                    loading :false
              });
            }
        },
        error:function(){

        }

       });
  },
   //滚动到顶部
   upper: function(e) {       
       this.getVideoList("up");
      
  },
  //滚动到底部
  lower: function(e) {
       this.getVideoList();
  }
})
