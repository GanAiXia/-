var app = getApp();

Page({
    data: {
        id: 0,
        title: "",
        date: "",
        time: "",
        nickname: "",
        mobile: "",
        house: {},
        sdate: "",
        edate: "",
        islogin: !1
    },
    onLoad: function(t) {
        var u = this, l = t.houseid;
        app.util.request({
            url: "entry/wxapp/houseinfo",
            cachetime: "30",
            data: {
                id: l
            },
            success: function(t) {
                var e = new Date(), a = e.getFullYear(), i = e.getMonth() + 1, n = e.getDate(), o = e.getHours(), s = e.getMinutes();
                u.setData({
                    id: l,
                    house: t.data.data,
                    date: a + "-" + i + "-" + n,
                    sdate: a + "-" + i + "-" + n,
                    edate: a + 1 + "-" + i + "-" + n,
                    time: o + ":" + s
                });
            }
        }), wx.getStorage({
            key: "shop",
            success: function(t) {
                wx.setNavigationBarTitle({
                    title: t.data.shopname + "咨询优惠"
                });
            }
        }), wx.getStorage({
            key: "userInfo",
            success: function(t) {
                u.setData({
                    islogin: !0
                });
            },
            fail: function(t) {
                app.util.getUserInfo(function(t) {
                    t.sessionid && u.setData({
                        islogin: !0
                    });
                });
            }
        });
    },
    bindDateChange: function(t) {
        this.setData({
            date: t.detail.value
        });
    },
    bindTimeChange: function(t) {
        this.setData({
            time: t.detail.value
        });
    },
    formSubmit: function(t) {
        console.log(t);
        var e = this, a = {
            id: e.data.id,
            url: "/wdl_weihouse/pages/house/index?id=" + e.data.id,
            acttype: "feed",
            title: t.detail.value.title,
            smalltext: "预约看房" + t.detail.value.truename + "|" + t.detail.value.mobile + "|" + t.detail.value.date + t.detail.value.time,
            form_id: t.detail.formId
        }, i = !0;
        "" == t.detail.value.truename && (wx.showToast({
            title: "请输入姓名"
        }), i = i && !1), "" == t.detail.value.mobile && (wx.showToast({
            title: "请输入手机号"
        }), i = i && !1), e.data.islogin || (wx.showToast({
            title: "请允许授权才能提交咨询",
            icon: "none"
        }), app.util.getUserInfo(function(t) {
            t.sessionid && e.setData({
                islogin: !0
            });
        })), i && e.data.islogin && app.util.request({
            url: "entry/wxapp/addfeed",
            data: a,
            success: function(t) {
                wx.showToast({
                    title: "提交成功",
                    success: function() {
                        wx.navigateBack();
                    }
                });
            }
        });
    },
    onReady: function() {
        wx.getStorage({
            key: "shop",
            success: function(t) {
                wx.setNavigationBarTitle({
                    title: t.data.shopname + "预约看房"
                });
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});