var app = getApp();

Page({
    data: {
        money: "",
        active: [],
        credit: 0,
        bill: 1
    },
    selectmoney: function(t) {
        var a = t.currentTarget.dataset.index, e = [];
        this.data.bill;
        e[a] = "active", this.setData({
            money: a,
            active: e,
            credit: this.calculte_bill(a)
        });
    },
    inputvalue: function(t) {
        var a = t.detail.value;
        this.data.bill;
        this.setData({
            money: a,
            active: [],
            credit: this.calculte_bill(a)
        });
    },
    calculte_bill: function(t) {
        var a = this.data.billmethod, e = 0;
        if (t = parseInt(t), 2 == a.bill_method) e = t >= parseInt(a.jieti3) ? a.jieti3_bill : t >= parseInt(a.jieti2) ? a.jieti2_bill : t >= parseInt(a.jieti1) ? a.jieti1_bill : t; else {
            var n = parseInt(a.bill);
            e = index * n;
        }
        return e;
    },
    onLoad: function(t) {
        var e = this;
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
            success: function(t) {
                wx.setStorage({
                    key: "shop",
                    data: t.data.data,
                    success: function() {}
                });
            }
        }), wx.getStorage({
            key: "shop",
            success: function(t) {
                console.log(t);
                var a = t.data.settingdata.credit.bill;
                e.setData({
                    bill: a,
                    billmethod: t.data.settingdata.credit
                });
            }
        });
    },
    wxpayHelper: function() {
        var a = this, t = a.data.money;
        if (!t) return wx.showToast({
            title: "请输入金额",
            icon: "none",
            duration: 1e3
        }), !1;
        app.util.request({
            url: "entry/wxapp/pay",
            data: {
                money: t
            },
            cachetime: "0",
            success: function(t) {
                t.data && t.data.data && !t.data.errno && wx.requestPayment({
                    timeStamp: t.data.data.timeStamp,
                    nonceStr: t.data.data.nonceStr,
                    package: t.data.data.package,
                    signType: "MD5",
                    paySign: t.data.data.paySign,
                    success: function(t) {
                        a.setData({
                            money: "",
                            active: [],
                            credit: 0
                        }), wx.showToast({
                            title: "充值成功",
                            icon: "none",
                            duration: 1e3
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "支付失败",
                            icon: "none",
                            duration: 1e3
                        });
                    }
                });
            },
            fail: function(t) {
                wx.showModal({
                    title: "系统提示",
                    content: t.data.message ? t.data.message : "错误",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && wx.showToast({
                            title: "支付失败",
                            icon: "none",
                            duration: 1e3
                        });
                    }
                });
            }
        });
    },
    formSubmit: function() {
        var t = this;
        app.kbtools.wxpayHelper(t, "makeorder", function() {
            t.setData({
                money: "",
                active: [],
                credit: 0
            }), wx.showToast({
                title: "充值成功",
                icon: "none",
                duration: 1e3
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});