var app = getApp();

Page({
    data: {
        house: {},
        id: 0,
        relation: [],
        shopname: "",
        groupid: 0,
        dialog: {},
        maskHidden: !1,
        flag0: 5,
        issubmit: 0,
        comments: [],
        comment_total: 0,
        comment_smalltext: ""
    },
    getHouseInfo: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/houseinfo",
            cachetime: "30",
            data: {
                id: a.data.id
            },
            success: function(t) {
                t.data.data.shopname = a.data.shopname, a.setData({
                    house: t.data.data
                }), a.comment_list(), a.realhouse();
            }
        });
    },
    realhouse: function() {
        var a = this, t = a.data.house;
        app.util.request({
            url: "entry/wxapp/limithouse",
            cachetime: "0",
            data: {
                "fkey[rent_type]": t.rent_type,
                "fkey[zhutype]": t.zhutype,
                limit: 20,
                "fkey[room]": t.room,
                "fkey[loyer]": t.loyer,
                noid: t.id
            },
            success: function(t) {
                console.log(t), a.setData({
                    relation: t.data.data
                });
            }
        });
    },
    comment_list: function() {
        var a = this, t = a.data.house;
        app.util.request({
            url: "entry/wxapp/comment",
            cachetime: "0",
            data: {
                limit: 10,
                tags: 39,
                infoid: t.id
            },
            success: function(t) {
                console.log(t), a.setData({
                    comments: t.data.data.salelist,
                    comment_total: t.data.data.total
                });
            }
        });
    },
    changeColor1: function(t) {
        var a = t.currentTarget.dataset.index;
        this.setData({
            flag0: a
        });
    },
    callbroker: function(t) {
        var a = t.currentTarget.dataset;
        "undefined" == a.phone ? wx.showToast({
            title: "房源未填写电话号码"
        }) : wx.makePhoneCall({
            phoneNumber: a.phone
        });
    },
    onPreviewImage: function(t) {
        var a = t.currentTarget.dataset.view, e = (t.currentTarget.dataset.type, this.data.house);
        wx.previewImage({
            content: a,
            urls: e.thumbs
        });
    },
    maptodaohang: function(t, a) {
        var e = this.data.house;
        app.showMapLocation(e.area + e.quan + e.village_name, e.title);
    },
    sharePaperDraw: function(t) {
        var a = this;
        this.setData({
            maskHidden: !1
        }), wx.showToast({
            title: "装逼中...",
            icon: "loading",
            duration: 1e3
        }), setTimeout(function() {
            wx.hideToast(), app.kbtools.sharePaperDrawing(a, a.data.house), a.setData({
                maskHidden: !0
            });
        }, 1e3);
    },
    addfavorite: function(t) {
        t.currentTarget.dataset;
        var a = this.data.house;
        app.kbtools.add_favorite(this, {
            id: a.id,
            ftype: 0,
            url: "/wdl_weihouse/pages/house/index?id=" + a.id,
            acttype: "fav",
            title: a.title,
            smalltext: a.village_name + "|" + a.room + "房" + a.hall + "厅" + a.garder + "卫" + a.loyer + a.prix_unitaire
        });
    },
    formSubmit: function(t) {
        console.log(t);
        var a = this, e = {
            id: a.data.id,
            url: "/wdl_weihouse/pages/house/index?id=" + a.data.id,
            ftype: 39,
            acttype: "comment",
            title: a.data.house.title,
            smalltext: "留言：" + t.detail.value.smalltext + "| 评分：" + a.data.flag0 + "分|",
            form_id: t.detail.formId
        }, o = !0;
        "" == t.detail.value.smalltext && (wx.showToast({
            title: "请输入内容"
        }), o = o && !1), o && app.util.request({
            url: "entry/wxapp/addfeed",
            data: e,
            success: function(t) {
                wx.showToast({
                    title: "提交成功",
                    success: function() {
                        a.setData({
                            issubmit: 1,
                            comment_smalltext: ""
                        }), a.getHouseInfo();
                    }
                });
            }
        });
    },
    onLoad: function(t) {
        app.kbtools.get_settingdata(this, function(t) {
            return !0;
        }), this.setData({
            id: parseInt(t.id)
        });
        var e = this;
        e.getHouseInfo(), app.util.request({
            url: "entry/wxapp/userprive",
            cachetime: "0",
            showLoading: !1,
            data: {},
            success: function(t) {
                var a = 0;
                app.kbtools.isnull(t.data.data.prive.broker) || (a = t.data.data.prive.broker.groupid), 
                e.setData({
                    groupid: a
                });
            }
        }), app.kbtools.siteAdvancise(app, e);
    },
    onDefRedirect: function(t) {
        app.kbtools.defRedirect(this, t);
    },
    onPreviewVrurl: function(t) {
        var a = t.currentTarget.dataset;
        console.log(a), app.kbtools.isnull(a.vrurl) ? wx.showToast({
            title: "暂无vr看房"
        }) : wx.navigateTo({
            url: "../index/link?href=" + encodeURIComponent(a.vrurl)
        });
    },
    onReady: function() {
        app.util.footer(this);
        var a = this;
        wx.getStorage({
            key: "shop",
            success: function(t) {
                wx.setNavigationBarTitle({
                    title: t.data.shopname + "房源详情"
                }), a.setData({
                    shopname: t.data.shopname
                });
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.getHouseInfo(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});