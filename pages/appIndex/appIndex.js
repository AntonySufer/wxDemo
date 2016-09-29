/***
 * @author antony
 * @date 20160922
 * @desc  项目的首页
 *       
 */
var app = getApp()
Page({
  data: {
    loadingOption :{hidden:false,toast1Hidden:true ,duration:1500},//弹出层属性
    errorMsg:"",  //错误提示
    array:[], //piceker 
    index :0,
    imgData :[], //swiper
    menuList :[],//isis-scroll
    current :0,//swiper图片当前页，
    option:{ indicatorDots: true,   //是否显示面板指示点  //swiper 配置
             autoplay: true,         //是否自动切换
             interval: 2000,         //滑动动画时长
             duration: 1000          //自动切换时间间隔
           } //swiper 配置 
  },
  //更新数据
  onLoad: function () {
    var _this = this ;
    _this.getData();
  },
  //加载dom
   onShow: function () {
             
  },
  //页面隐藏
  onHide :function(){

  },
  //从服务器上获取数据 peicker swiper  scroll
  getData:function(){
    var _this = this ;
      wx.request({
        url:'http://gank.io/api/data/福利/10/1',
        success:function(data){
            
          if(!data.error){
            var  resultList = data.data.results;
            var dataArray = [];
            var imgUrls =[ 'http://www.bz55.com/uploads/allimg/150326/140-150326115T2.jpg',
                           'http://img2.imgtn.bdimg.com/it/u=869444241,676906613&fm=21&gp=0.jpg',
                           'http://a.hiphotos.baidu.com/image/pic/item/eac4b74543a98226b7bc9a198982b9014a90eb8b.jpg'
                          ];
            var menuList =[] ;

               /* resultList.forEach(function(item,index){ 
                    dataArray.push( item.source);  //picker;
                    imgUrls.push( item.url);
                    
                });*/
               
                

              for(var i=0; i<20; i++){
                menuList.push({index:i,menu:"菜单"+i+1});
              }
            //获取picker的值
            _this.setData({
                array:dataArray
              });
             //获取swiper的值
            _this.setData({
                imgData: imgUrls
              });
        
              //swiper
             _this.setData({
                menuList: menuList
              });

              //关闭loading
            var loadingOption =  _this.data.loadingOption;
                loadingOption.hidden = true ;
             _this.setData({
                loadingOption: loadingOption
              });
            
          }
          

        },
        erro:function(data){
            //错误信息
            _this.data.errorMsg = "错误信息信息："+data;
              //开启toast
            var loadingOption =  _this.data.loadingOption;
                loadingOption.toast1Hidden = false ;
              _this.setData({
                errorMsg:_this.data.errorMsg,
                loadingOption :loadingOption
              });
              console.log(data);
        }
      });
  },
  //picker 选中确定
  bindPickerChange: function(e) {
  //  console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      index: e.detail.value
    })
  },
    //swiper 选中
    getImgValue: function(e) {
  //       console.log('swiper发送选中', e.detail.current);  //当前页
    this.setData({
      current: e.detail.current
    })
  },
  //滚动到顶部
   upper: function(e) {       
     var _this = this ;
      //开启loading
     /* var loadingOption =  _this.data.loadingOption;
          loadingOption.hidden = false ;
        _this.setData({
          loadingOption: loadingOption
        });*/
     var menuUpLists =[];
        for(var i=20; i>0; i--){
              var index = i+1;
                  menuUpLists.push({index:i,menu:"滚动顶部"+index});
            }
     var  menuUpLists = menuUpLists.concat(_this.data.menuList);  
     
       //   loadingOption.hidden = true ;
          //swiper
          _this.setData({
                menuList: menuUpLists
         //        loadingOption: loadingOption
           });
     
      
  },
  //滚动到底部
  lower: function(e) {
    var _this = this ;
      //开启loading
   /*  var loadingOption =  _this.data.loadingOption;
          loadingOption.hidden = false ;
        _this.setData({
          loadingOption: loadingOption
        });*/
    var menuLowLists =[];
        for(var i=0; i<20; i++){
              var index = i+1;
                  menuLowLists.push({index:i,menu:"滚动底部"+index});
            }
    var  menuList = _this.data.menuList.concat(menuLowLists);  
          //swiper
        //  loadingOption.hidden = true ;
          //swiper
          _this.setData({
                menuList: menuList
         //        loadingOption: loadingOption
           });
  },
  //菜单选择
  buttonSelect : function(e){
     console.log(e);
  },
   //关闭弹窗 设置时间了，自动执行
  toastChange:function(){
    var _this = this ;
       var loadingOption =  _this.data.loadingOption;
          loadingOption.toast1Hidden = true ;
        _this.setData({
          loadingOption: loadingOption
        });
  }

  
})