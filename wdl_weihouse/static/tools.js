var tools = {
    parseUrl: function(t) {
        var e, a = {
            protocol: /([^\/]+:)\/\/(.*)/i,
            host: /(^[^\:\/]+)((?:\/|:|$)?.*)/,
            port: /\:?([^\/]*)(\/?.*)/,
            pathname: /([^\?#]+)(\??[^#]*)(#?.*)/
        }, n = {};
        for (var s in n.href = t, a) e = a[s].exec(t), n[s] = e[1], "" === (t = e[2]) && (t = "/"), 
        "pathname" === s && (n.pathname = e[1], n.search = e[2], n.hash = e[3]);
        return n;
    },
    url_to_host: function(t) {
        var e = tools.parseUrl(t), a = e.pathname, n = a.substring(1, a.substr(1).indexOf("/") + 1);
        return "app" !== n ? e.protocol + "//" + e.host + "/" + n : e.protocol + "//" + e.host;
    },
    isnull: function(t) {
        return !t || void 0 === t || null == t || 0 == t;
    },
    add_favorite: function(t, e) {
        var a = getApp();
        a.checkAuthorLogin(t), a.util.request({
            url: "entry/wxapp/addfavorite",
            data: e,
            success: function(t) {
                wx.showToast({
                    title: t.data.message
                });
            }
        });
    },
    get_settingdata: function(t, e) {
        getApp().util.request({
            url: "entry/wxapp/settingData",
            cachetime: "60",
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
                }), e(t.data);
            }
        });
    },
    wxpayHelper: function(t, e, a) {
        var n = getApp(), s = t.data.money;
        if (!s) return wx.showToast({
            title: "请输入金额",
            icon: "none",
            duration: 1e3
        }), !1;
        n.util.request({
            url: "entry/wxapp/pay",
            data: {
                money: s,
                actname: e
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
                        a();
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
    extend: function(t, e, a) {
        if (e instanceof Array) for (var n = 0, s = e.length; n < s; n++) tools.extend(t, e[n], a);
        for (var n in e) !a && n in t || (t[n] = e[n]);
        return t;
    },
    siteAdvancise: function(t, e) {
        t.util.request({
            url: "entry/wxapp/enset",
            cachetime: "30",
            showLoading: !1,
            data: {
                op: "adinfo"
            },
            success: function(t) {
                e.setData({
                    adinfo: t.data.data
                });
            }
        });
    },
    defRedirect: function(t, e) {
        try {
            if ("navtab" == e.currentTarget.dataset.type) this.isnull(t.data.showRightMenuOk) ? t.setData({
                showRightMenuOk: !0
            }) : t.setData({
                showRightMenuOk: !1
            }); else {
                var a = e.currentTarget.dataset;
                this.isnull(a.appid) ? this.isnull(a.url) ? console.log(e) : wx.navigateTo({
                    url: a.url
                }) : wx.navigateToMiniProgram({
                    appId: a.appid,
                    path: a.url
                });
            }
        } catch (e) {
            console.log(e);
        }
    },
    sharePaperDrawing: function(a, t) {
        var e = wx.createCanvasContext("mycanvas");
        e.setFillStyle("#FFFFFF"), e.fillRect(0, 0, 375, 667), wx.getImageInfo({
            src: t.thumb,
            success: function(t) {
                console.log(t), e.drawImage(t.path, 0, 0, 375, 183);
                e.drawImage("/wdl_weihouse/static/images/get_avatar.png", 126, 186, 120, 120);
                e.setFontSize(24), e.setFillStyle("red"), e.setTextAlign("center"), e.fillText("我是分享达人", 185, 340), 
                e.stroke(), e.setFontSize(14), e.setFillStyle("red"), e.setTextAlign("center"), 
                e.fillText("邀请你一起去吃面", 185, 370), e.stroke(), e.drawImage("/wdl_weihouse/static/images/get_avatar.png", 48, 390, 280, 84), 
                e.setFontSize(40), e.setFillStyle("#ffe200"), e.setTextAlign("center"), e.fillText("5622211", 185, 435), 
                e.stroke(), e.drawImage("/wdl_weihouse/static/images/get_avatar.png", 25, 520, 184, 82), 
                e.setFontSize(12), e.setFillStyle("red"), e.setTextAlign("left"), e.fillText("进入小程序输入朋友的邀请", 35, 540), 
                e.stroke(), e.setFontSize(12), e.setFillStyle("red"), e.setTextAlign("left"), e.fillText("码，朋友和你各自获得通用", 35, 560), 
                e.stroke(), e.setFontSize(12), e.setFillStyle("red"), e.setTextAlign("left"), e.fillText("优惠券1张哦~", 35, 580), 
                e.stroke(), e.drawImage("/wdl_weihouse/static/images/get_avatar.png", 248, 578, 90, 25), 
                e.arc(186, 246, 50, 0, 2 * Math.PI), e.strokeStyle = "#ffe200", e.clip(), e.drawImage("/wdl_weihouse/static/images/get_avatar.png", 136, 196, 100, 100), 
                e.draw(), setTimeout(function() {
                    wx.canvasToTempFilePath({
                        canvasId: "mycanvas",
                        success: function(t) {
                            var e = t.tempFilePath;
                            a.setData({
                                imagePath: e,
                                canvasHidden: !0
                            });
                        },
                        fail: function(t) {
                            console.log(t);
                        }
                    });
                }, 200);
            }
        });
    }
};

module.exports = tools;