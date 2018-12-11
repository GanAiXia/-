var app = getApp();

Page({
    data: {
        shareuser: {},
        uid: 0,
        scence: "",
        qrinfo: {}
    },
    onLoad: function(e) {
        var t = this, a = "";
        if (!app.kbtools.isnull(e.scence)) {
            a = decodeURIComponent(e.scence);
            t.setData({
                scence: a
            }), t.getscence_info();
        }
        wx.getStorage({
            key: "userInfo",
            success: function(e) {
                app.kbtools.isnull(e.data.memberInfo) || (t.setData({
                    uid: e.data.memberInfo.uid,
                    scence: a
                }), t.loadinfo());
            }
        });
    },
    getscence_info: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/share",
            data: {
                op: "scence",
                scence: i.data.scence
            },
            success: function(e) {
                var t = e.data.data, a = "switchTab", n = "/wdl_weihouse/pages/index/welcome";
                "sec" == t.category ? (a = "redirectTo", n = "/wdl_weihouse/pages/house/index?id=" + t.infoid) : "newshop" == t.category && (a = "redirectTo", 
                n = "/wdl_weihouse/pages/newshop/index?id=" + t.infoid), i.setData({
                    qrinfo: t,
                    rediret: a,
                    url: n
                });
            }
        });
    },
    gobackview: function() {
        var e = this, t = (e.data.qrinfo, e.data.rediret), a = e.data.url;
        "switchTab" == t ? wx.switchTab({
            url: a
        }) : wx.redirectTo({
            url: a
        });
    },
    loadinfo: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/share",
            data: {
                op: "display",
                uid: t.data.uid
            },
            success: function(e) {
                200 == e.statusCode && t.setData({
                    shareuser: e.data.data
                });
            }
        });
    },
    formSubmit: function(e) {
        var t, a, n, i = !0;
        if (app.kbtools.isnull(e.detail.value.username) ? i = !1 : t = e.detail.value.username, 
        app.kbtools.isnull(e.detail.value.mobile) ? i = !1 : a = e.detail.value.mobile, 
        app.kbtools.isnull(e.detail.value.identify) ? i = !1 : n = e.detail.value.identify, 
        !i) return wx.showModal({
            title: "提示信息",
            content: "请输入我的信息"
        }), !1;
        app.util.request({
            url: "entry/wxapp/share",
            data: {
                op: "modify",
                username: t,
                scence: this.data.scence,
                mobile: a,
                identify: n,
                uid: this.data.uid
            },
            success: function(e) {
                200 == e.statusCode && (wx.showModal({
                    title: "提示信息",
                    content: "保存成功"
                }), wx.switchTab({
                    url: "/wdl_weihouse/pages/index/user"
                }));
            }
        });
    },
    formReset: function(e) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.loadinfo(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});