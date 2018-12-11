var app = getApp();

Page({
    data: {
        house: {},
        id: 0,
        relation: [],
        shopname: "",
        groupid: 0
    },
    getHouseInfo: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/houseinfo",
            cachetime: "30",
            data: {
                id: e.data.id
            },
            success: function(t) {
                t.data.data.shopname = e.data.shopname, e.setData({
                    house: t.data.data
                }), e.realhouse();
            }
        });
    },
    realhouse: function() {
        var e = this, t = e.data.house;
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
                console.log(t), e.setData({
                    relation: t.data.data
                });
            }
        });
    },
    callbroker: function(t) {
        var e = t.currentTarget.dataset;
        "undefined" == e.phone ? wx.showToast({
            title: "房源未填写电话号码"
        }) : wx.makePhoneCall({
            phoneNumber: e.phone
        });
    },
    onPreviewImage: function(t) {
        var e = t.currentTarget.dataset.view, a = (t.currentTarget.dataset.type, this.data.house);
        wx.previewImage({
            content: e,
            urls: a.thumbs
        });
    },
    maptodaohang: function(t, e) {
        var a = this.data.house;
        app.showMapLocation(a.area + a.quan + a.village_name, a.title);
    },
    addfavorite: function(t) {
        t.currentTarget.dataset;
        var e = this.data.house;
        app.kbtools.add_favorite(this, {
            id: e.id,
            ftype: 0,
            url: "/wdl_weihouse/pages/house/index?id=" + e.id,
            acttype: "fav",
            title: e.title,
            smalltext: e.village_name + "|" + e.room + "房" + e.hall + "厅" + e.garder + "卫" + e.loyer + e.prix_unitaire
        });
    },
    onLoad: function(t) {
        app.kbtools.get_settingdata(this, function(t) {
            return !0;
        }), this.setData({
            id: parseInt(t.id)
        });
        var a = this;
        a.getHouseInfo(), app.util.request({
            url: "entry/wxapp/userprive",
            cachetime: "0",
            showLoading: !1,
            data: {},
            success: function(t) {
                var e = 0;
                app.kbtools.isnull(t.data.data.prive.broker) || (e = t.data.data.prive.broker.groupid), 
                a.setData({
                    groupid: e
                });
            }
        }), app.kbtools.siteAdvancise(app, a);
    },
    onDefRedirect: function(t) {
        app.kbtools.defRedirect(this, t);
    },
    onReady: function() {
        app.util.footer(this);
        var e = this;
        wx.getStorage({
            key: "shop",
            success: function(t) {
                wx.setNavigationBarTitle({
                    title: t.data.shopname + "需求详情"
                }), e.setData({
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