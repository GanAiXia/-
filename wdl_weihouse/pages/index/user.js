var app = getApp();

Page({
    data: {
        avatar: "http://wx.qlogo.cn/mmopen/TSfwk7mcXP6LQSGicjiaV8wNdKSxDSqe35TXDrYdEvnlGzJ0Ho0QkfOKom4IJicIEtFpbntzbicwCwuGiayiabhibicNNVTvErnKr6Y0/132",
        username: "-访客-",
        broker: {},
        hiddendialog: !0,
        positon: ""
    },
    brokerinfo: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/brokeragent",
            data: {
                enews: "getinfo"
            },
            showLoading: !1,
            success: function(o) {
                200 == o.statusCode && (console.log(o.data.data.result), t.setData({
                    broker: o.data.data.result
                }));
            }
        });
    },
    trigger_dialog: function(o) {
        console.log(o);
        var t = this.data.hiddendialog;
        this.setData({
            hiddendialog: !t,
            positon: "top:" + (o.detail.y - 100) + "rpx"
        });
    },
    onLoad: function(o) {
        var t = this;
        app.checkAuthorLogin(this), wx.getStorage({
            key: "userInfo",
            success: function(o) {
                t.setData({
                    avatar: o.data.wxInfo.avatarUrl,
                    username: o.data.wxInfo.nickName
                });
            }
        }), this.brokerinfo();
    },
    onReady: function() {
        wx.getStorage({
            key: "shop",
            success: function(o) {}
        }), app.util.footer(this);
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.brokerinfo(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});