var app = getApp();

Page({
    data: {
        avatar: "http://wx.qlogo.cn/mmopen/TSfwk7mcXP6LQSGicjiaV8wNdKSxDSqe35TXDrYdEvnlGzJ0Ho0QkfOKom4IJicIEtFpbntzbicwCwuGiayiabhibicNNVTvErnKr6Y0/132",
        username: "-访客-",
        broker: {},
        type: 1,
        pageinfo: {
            1: {
                title: "我的余额"
            },
            2: {
                title: "我的积分"
            }
        }
    },
    brokerinfo: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/brokeragent",
            data: {
                enews: "getinfo"
            },
            showLoading: !1,
            success: function(t) {
                200 == t.statusCode && (console.log(t.data.data.result), a.setData({
                    broker: t.data.data.result
                }));
            }
        });
    },
    onLoad: function(t) {
        var a = this;
        app.checkAuthorLogin(this);
        var e = a.data.type;
        app.kbtools.isnull(t.type) || (e = t.type, a.setData({
            type: e
        })), wx.getStorage({
            key: "userInfo",
            success: function(t) {
                a.setData({
                    avatar: t.data.wxInfo.avatarUrl,
                    username: t.data.wxInfo.nickName
                });
            }
        }), this.brokerinfo(), wx.setNavigationBarTitle({
            title: a.data.pageinfo[e].title
        });
    },
    onReady: function() {
        app.util.footer(this);
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