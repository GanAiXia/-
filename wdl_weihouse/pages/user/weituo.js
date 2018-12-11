var app = getApp();

Page({
    data: {
        whois: 1,
        leixin: 1,
        yezhu: 1,
        prix: "万元",
        agree: 0
    },
    swichNav: function(t) {
        if (this.data.whois === t.target.dataset.current) return !1;
        var e = t.target.dataset.current;
        this.setData({
            whois: e,
            leixin: e,
            yezhu: 1 == e ? 1 : 3,
            prix: "万元"
        });
    },
    swichNav2: function(t) {
        if (this.data.yezhu === t.target.dataset.current) return !1;
        var e = t.target.dataset.current, a = 1 == e || 3 == e ? "万元" : "元/月";
        this.setData({
            yezhu: e,
            prix: a
        });
    },
    checkbox_agree: function(t) {
        var e = this.data.agree;
        e = 1 == t.detail.value.length ? 1 : 0, this.setData({
            agree: e
        });
    },
    bindKeyInput: function(t) {},
    formSubmit: function(t) {
        var e = this;
        if (!t.detail.value.publish_name) return wx.showToast({
            title: "请输入您的姓名",
            icon: "none"
        }), !1;
        if (!t.detail.value.linkphone) return wx.showToast({
            title: "请输入您的手机号码",
            icon: "none"
        }), !1;
        var a = 1 == e.data.whois ? "我是业主" : "我要置业", i = {
            1: "卖房",
            2: "放租",
            3: "买房",
            4: "女士征婚"
        }[e.data.yezhu], n = t.detail.value.loyer + e.data.prix;
        1 == e.data.agree && (n = "面议");
        var o = {
            id: 0,
            ftype: 12,
            url: "",
            acttype: "weituo",
            title: "【在线委托】" + a + " 委托 " + i,
            smalltext: t.detail.value.publish_name + "|" + t.detail.value.linkphone + "|楼盘：" + t.detail.value.village_name + "|" + t.detail.value.room + "房 " + t.detail.value.hall + "厅 " + t.detail.value.garder + "卫 | 价格" + n
        };
        console.log(e.data), e.data.islogin ? app.util.request({
            url: "entry/wxapp/addfeed",
            data: o,
            success: function(t) {
                wx.showToast({
                    title: "提交成功",
                    success: function() {
                        wx.switchTab({
                            url: "../index/user"
                        });
                    }
                });
            }
        }) : (wx.showToast({
            title: "请允许授权才能提交咨询",
            icon: "none"
        }), app.util.getUserInfo(function(t) {
            t.sessionid && e.setData({
                islogin: !0
            });
        }));
    },
    onLoad: function(t) {
        app.checkAuthorLogin(this, "/wdl_weihouse/pages/user/weituo");
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});