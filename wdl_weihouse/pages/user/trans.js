var _Page;

function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var app = getApp();

Page((_defineProperty(_Page = {
    data: {
        money: "",
        active: [],
        credit: 0,
        bill: 1,
        broker: {}
    },
    inputvalue: function(e) {
        var t = e.detail.value, a = this.data.bill, n = Math.round(100 * this.data.broker.member.credit1) / 100, o = 0;
        app.kbtools.isnull(t) || (n < t && (wx.showToast({
            title: "最多只能兑换" + n + "分",
            icon: "none",
            duration: 1e3
        }), t = n), o = Math.floor(t / a)), this.setData({
            money: t,
            active: [],
            credit: o
        });
    },
    wxpayHelper: function() {
        var t = this, e = t.data.money;
        if (!e) return wx.showToast({
            title: "请输入兑换积分数",
            icon: "none",
            duration: 1e3
        }), !1;
        app.util.request({
            url: "entry/wxapp/update",
            data: {
                money: e,
                enews: "transjifen",
                credit: t.data.credit
            },
            cachetime: "0",
            success: function(e) {
                wx.showToast({
                    title: "兑换成功",
                    icon: "none",
                    duration: 1e3
                }), t.brokerinfo(), t.setData({
                    money: ""
                });
            },
            fail: function(e) {
                wx.showModal({
                    title: "系统提示",
                    content: e.data.message ? e.data.message : "错误",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && wx.showToast({
                            title: "兑换失败",
                            icon: "none",
                            duration: 1e3
                        });
                    }
                });
            }
        });
    },
    formSubmit: function() {
        this.wxpayHelper();
    },
    brokerinfo: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/brokeragent",
            data: {
                enews: "getinfo"
            },
            showLoading: !1,
            success: function(e) {
                200 == e.statusCode && (console.log(e.data.data.result), t.setData({
                    broker: e.data.data.result
                }));
            }
        });
    }
}, "brokerinfo", function() {
    var t = this;
    app.util.request({
        url: "entry/wxapp/brokeragent",
        data: {
            enews: "getinfo"
        },
        showLoading: !1,
        success: function(e) {
            200 == e.statusCode && (console.log(e.data.data.result), t.setData({
                broker: e.data.data.result
            }));
        }
    });
}), _defineProperty(_Page, "onLoad", function(e) {
    var a = this;
    app.util.request({
        url: "entry/wxapp/settingData",
        cachetime: "0",
        showLoading: !1,
        data: {
            "fkey[0]": "logo",
            "fkey[1]": "banner",
            "fkey[2]": "shopname",
            "fkey[3]": "copyinfo",
            "fkey[4]": "cityprice",
            "fkey[5]": "saletotal"
        },
        success: function(e) {
            wx.setStorage({
                key: "shop",
                data: e.data.data,
                success: function() {
                    console.log("获取settingData成功");
                }
            });
        }
    }), wx.getStorage({
        key: "shop",
        success: function(e) {
            console.log(e);
            var t = e.data.settingdata.credit.duihuan;
            a.setData({
                bill: t
            });
        }
    }), this.brokerinfo();
}), _defineProperty(_Page, "onReady", function() {}), _defineProperty(_Page, "onShow", function() {}), 
_defineProperty(_Page, "onHide", function() {}), _defineProperty(_Page, "onUnload", function() {}), 
_defineProperty(_Page, "onPullDownRefresh", function() {}), _defineProperty(_Page, "onReachBottom", function() {}), 
_defineProperty(_Page, "onShareAppMessage", function() {}), _Page));