// pages/modify_tel/modify.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    uid: '',
    passwd: '',
    signature: '',
    img_url: '',
    tel: '',
    school: '',
    money: '',
    credit: ''
  },

  getData: function () {
    var that = this
    wx.request({
      url: 'http://happyzhier.club:3000/user?uid=' + app.globalData.username,
      method: 'GET',
      success: function (res) {
        console.log('tel check')
        console.log(res.data.userInfo.tel)
        that.setData({
          nickname: res.data.userInfo.nickname,
          uid: res.data.userInfo.uid,
          passwd: res.data.userInfo.passwd,
          signature: res.data.userInfo.signature,
          img_url: res.data.userInfo.img_url,
          tel: res.data.userInfo.tel,
          school: res.data.userInfo.school,
          money: res.data.userInfo.money,
          credit: res.data.userInfo.credit
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData()
  },

  inputvalue: function (e) {
    this.setData({
      tel: e.detail.value
    })

  },

  post: function () {
    if (!(/^1[3456789]\d{9}$/.test(this.data.tel))) {
      wx.showModal({
        content: '操作失败，联系方式应该是11位数字',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
      return false;
    } 
    wx.request({
      url: 'http://happyzhier.club:3000/user?uid=' + app.globalData.username,
      method: 'PUT',
      data: {
        uid: this.data.uid,
        passwd: this.data.passwd,
        nickname: this.data.nickname,
        signature: this.data.signature,
        img_url: this.data.img_url,
        tel: this.data.tel,
        school: this.data.school,
        money: this.data.money,
        credit: this.data.credit
      },
      success: function (res) {
        if (res.data.msg == 'success') {
          wx.showToast({
            title: '已完成',
            icon: 'success',
            duration: 1000
          });
        } else {
          wx.showToast({
            title: '修改失败',
            icon: 'warn',
            duration: 1000
          });
        }
      },
      fail: function (err) {
        console.log(err)
        wx.showToast({
          title: '修改失败',
          icon: 'warn',
          duration: 1000
        });
      }
    })
  }
})