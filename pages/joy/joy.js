//index.js
/***
 * @author antony
 * @date 20160924
 * @desc 进入头条视频
 *       
 */
   //今日头条请求地址
var request_url ="http://www.toutiao.com/api/article/feed/?category=essay_joke&utm_source=toutiao&max_behot_time=0&max_behot_time_tmp=0&as=A1D5570ED9D072D&cp=57E93037723D7E1";
var app = getApp()
Page({
  data: {
     loading : true,//显示loading
     textData : [], //笑话list,
     headData :[] //头像
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
            var textNewData =[];
            var headDatas =[];
            if(reuslt.statusCode==200){
                  textNewData = reuslt.data.data;
                 
                 textNewData.forEach(function(item,index){
                     var header_img = item.group.user.avatar_url ;
                     var user_name = item.group.user.name ;
                     textNewData[index].group.header_img = header_img;
                     textNewData[index].group.user_name = user_name;
                    // headDatas.push(header_img);
                 })

               if(type=="up"){
                textNewData = _this.data.textData.concat(textNewData); 
               }else{
                textNewData = textNewData.concat(_this.data.textData); 
               }

               _this.setData({
                    textData:textNewData,
                    loading :false,
                  //  headData:headDatas
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
