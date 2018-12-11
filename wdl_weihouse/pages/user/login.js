var app = getApp();

Page({
    data: {
        storage: {}
    },
    onLoad: function(n) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/settingData",
            cachetime: "60",
            showLoading: !1,
            data: {
                "fkey[0]": "logo",
                "fkey[1]": "banner",
                "fkey[2]": "shopname",
                "fkey[3]": "copyinfo",
                "fkey[4]": "phone",
                "fkey[5]": "saletotal"
            },
            success: function(n) {
                t.setData({
                    storage: n.data.data
                });
            }
        });
    },
    updateUserInfo: function(n) {
        getApp().util.getUserInfo(function(n) {
            wx.switchTab({
                url: "../index/user"
            });
        }, n.detail);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});