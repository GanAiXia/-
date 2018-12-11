var app = getApp();

Page({
    data: {
        prive: {}
    },
    userprive: function() {
        var o = this;
        app.util.request({
            url: "entry/wxapp/userprive",
            cachetime: "0",
            showLoading: !1,
            data: {},
            success: function(e) {
                console.log(e), o.setData({
                    prive: e.data.data
                });
            }
        });
    },
    onLoad: function(e) {
        this.userprive();
    },
    manage: function(e) {
        var o = this, n = e.currentTarget.dataset, t = o.data.prive;
        if ("broker2" == n.op) {
            var r = Math.round(100 * t.member.credit2) / 100;
            console.log(r);
            var a = t.prive.credit.open_broker2;
            if (a = Math.round(100 * a) / 100, o.setData({
                money: a
            }), r < a) return wx.showToast({
                title: "余额不足，请先充值",
                icon: "none",
                duration: 2e3
            }), !1;
            wx.showModal({
                title: "提示",
                content: "确定支付" + a + "元升级吗？",
                success: function(e) {
                    e.confirm ? app.kbtools.wxpayHelper(o, "buygroup_pay", function() {
                        wx.showToast({
                            title: "升级成功",
                            icon: "success",
                            duration: 2e3
                        }), o.userprive();
                    }) : e.cancel;
                }
            });
        }
        "broker" == n.op && wx.navigateTo({
            url: "../user/brokeragent"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.userprive(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});