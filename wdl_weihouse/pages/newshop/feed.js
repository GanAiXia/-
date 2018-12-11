var app = getApp();

Page({
    data: {
        newhouse_id: 0,
        items: "",
        agree: 1,
        islogin: !1,
        house_title: ""
    },
    formSubmit: function(e) {
        var t = this;
        if (!e.detail.value.username) return wx.showToast({
            title: "请输入您的姓名",
            icon: "none"
        }), !1;
        if (!e.detail.value.mobile) return wx.showToast({
            title: "请输入您的手机号码",
            icon: "none"
        }), !1;
        if (!e.detail.value.yusuan) return wx.showToast({
            title: "请输入您的购房预算",
            icon: "none"
        }), !1;
        if (!t.data.agree) return wx.showToast({
            title: "请勾选我同意《用户协议》",
            icon: "none"
        }), !1;
        var i = {
            id: t.data.newhouse_id,
            ftype: 8,
            url: "/wdl_weihouse/pages/newshop/index?id=" + t.data.newhouse_id,
            acttype: "feed",
            title: t.data.house_title + " 新房优惠咨询",
            smalltext: e.detail.value.username + "|" + e.detail.value.mobile + "|" + e.detail.value.yusuan + "|" + e.detail.value.extinfo + "|" + t.data.items + "|"
        };
        console.log(t.data), t.data.islogin ? app.util.request({
            url: "entry/wxapp/addfeed",
            data: i,
            success: function(e) {
                wx.showToast({
                    title: "提交成功",
                    success: function() {
                        wx.navigateBack();
                    }
                });
            }
        }) : (wx.showToast({
            title: "请允许授权才能提交咨询",
            icon: "none"
        }), app.util.getUserInfo(function(e) {
            e.sessionid && t.setData({
                islogin: !0
            });
        }));
    },
    checkbox_item: function(e) {
        var t = e.detail.value;
        this.setData({
            items: t.join("|")
        });
    },
    checkbox_agree: function(e) {
        var t = this.data.agree;
        t = 1 == e.detail.value.length ? 1 : 0, this.setData({
            agree: t
        });
    },
    onLoad: function(e) {
        app.kbtools.isnull(e.hid) || this.setData({
            newhouse_id: parseInt(e.hid)
        }), app.kbtools.isnull(e.title) || (this.setData({
            house_title: e.title
        }), wx.setNavigationBarTitle({
            title: e.title + "咨询优惠"
        })), app.checkAuthorLogin(this, "/wdl_weihouse/pages/newshop/feed?hid=" + e.hid + "&title=" + e.title);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});