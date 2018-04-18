const weatherMap = {
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪',
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴'
}

const weatherColor = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

Page({
  data:{
    nowTemp: 0,
    nowWeather: '',
    forsize:[]
  }
  ,
  onLoad() {
    //console.log("hello word");
    this.getNowWeather();
  },
 scroll:function(e) {
  //console.log("滑动");
 },
  onPullDownRefresh : function() {
    console.log("下拉刷新");
    this.getNowWeather(()=>{
      wx.stopPullDownRefresh()
    });
    
  }
,
  getNowWeather(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      method: 'GET',
      data: {
        city: '北京市'
      },
      dataType: 'json',
      success: res => {
        console.log(res);
        console.log("温度： " + res.data.result.now.temp + " 天气：" + res.data.result.now.weather);
        let nowTemp = res.data.result.now.temp
        let nowWeather = res.data.result.now.weather;

        //动态设置导航条背景颜色
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColor[nowWeather]
        })

        this.setData({
          nowTemp: nowTemp + '°',
          nowWeather: weatherMap[nowWeather],
          weatherImgPath: '/img/' + nowWeather + '-bg.png',
          forsize: res.data.result.forecast,
         // weatherIconPath: '/img/' + res.data.result.forecast.weather + '-icon.png'
        })

      },
      fail: function () {
        console.long("请求失败");
      },
      complete: function() {
        //如果callback不为空，就执行callback函数
        callback && callback()
      }
    })
  }

})
