var app = getApp();

Page({
    data: {
        house: {},
        shop: {},
        newhouse_id: 0,
        default_face: "",
        salelist: [],
        relation: [],
        housepic: [],
        roomlist: [],
        latitude: 23.099994,
        longitude: 113.32452,
        markers: [],
        storage: {}
    },
    setMapInfo: function() {
        var e = this, t = e.data.shop;
        e.setData({
            latitude: t.map_y,
            longitude: t.map_x,
            markers: [ {
                id: t.id,
                latitude: t.map_y,
                longitude: t.map_x,
                title: e.data.house.house_title + "项目位置",
                iconPath: "/wdl_weihouse/static/images/location.png",
                label: {
                    content: "" + e.data.house.house_title,
                    color: "#bf0000",
                    padding: "5",
                    borderRadius: "5",
                    bgColor: "#48C23D"
                }
            } ]
        });
    },
    showMapLocation: function(e) {
        var t = this.data.house, a = t.house_region + t.house_address, o = t.house_title, s = e.currentTarget.dataset.point;
        s && (a = s), app.showMapLocation(a, o);
    },
    onPreviewImage: function(e) {
        var t = e.currentTarget.dataset.view, a = e.currentTarget.dataset.type;
        if ("xc" == a) {
            var o = this.data.housepic, s = [];
            for (var i in o) s.push(o[i].img_url);
            wx.previewImage({
                content: t,
                urls: s
            });
        }
        if ("hxt" == a) {
            o = this.data.ybf, s = [];
            for (var i in o) s.push(o[i].img_url);
            wx.previewImage({
                content: t,
                urls: s
            });
        }
    },
    getHouseInfo: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/newshop",
            cachetime: "60",
            data: {
                id: t.data.newhouse_id
            },
            success: function(e) {
                t.setData({
                    house: e.data.data.house,
                    shop: e.data.data.shop,
                    salelist: e.data.data.salelist,
                    housepic: e.data.data.housepic,
                    ybf: e.data.data.ybf
                }), t.setMapInfo(), wx.setNavigationBarTitle({
                    title: e.data.data.house.house_title + "-楼盘首页"
                }), app.util.request({
                    url: "entry/wxapp/houseroom",
                    cachetime: "30",
                    data: {
                        limit: 4,
                        newhouse_id: t.data.newhouse_id
                    },
                    success: function(e) {
                        t.setData({
                            roomlist: e.data.data.roomlist
                        });
                    }
                }), app.util.request({
                    url: "entry/wxapp/realnewhouse",
                    cachetime: "30",
                    data: {
                        limit: 4,
                        newhouse_id: t.data.newhouse_id
                    },
                    success: function(e) {
                        t.setData({
                            relation: e.data.data
                        });
                    }
                });
            }
        });
    },
    callbroker: function(e) {
        var t = e.currentTarget.dataset;
        "undefined" == t.phone ? wx.showToast({
            title: "房源未填写销售热线"
        }) : wx.makePhoneCall({
            phoneNumber: t.phone
        });
    },
    regionchange: function(e) {
        console.log(e.type);
    },
    markertap: function(e) {
        console.log(e.markerId);
    },
    controltap: function(e) {
        console.log(e.controlId);
    },
    onLoad: function(e) {
        this.setData({
            newhouse_id: parseInt(e.id)
        });
        var a = this;
        a.getHouseInfo();
        var t = this;
        app.kbtools.get_settingdata(a, function(e) {
            t.setData({
                storage: e.data
            });
        }), app.util.request({
            url: "entry/wxapp/userprive",
            cachetime: "0",
            showLoading: !1,
            data: {},
            success: function(e) {
                var t = 0;
                app.kbtools.isnull(e.data.data.prive.broker) || (t = e.data.data.prive.broker.groupid), 
                a.setData({
                    groupid: t
                });
            }
        }), app.kbtools.siteAdvancise(app, a);
    },
    onPreviewImageFace: function(e) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/newhousepic",
            cachetime: "300",
            data: {
                newhouse_id: a.data.newhouse_id
            },
            success: function(e) {
                console.log(e);
                var t = e.data.data;
                t.push(a.data.house.house_logo), wx.previewImage({
                    content: a.data.house.house_logo,
                    urls: t
                });
            }
        });
    },
    onAddfavorite: function() {
        var e = this.data.house;
        app.kbtools.add_favorite(this, {
            id: e.newshouse_id,
            title: e.house_title,
            ftype: 10,
            acttype: "newshopfav",
            url: "/wdl_weihouse/pages/newshop/index?id=" + e.newshouse_id,
            smalltext: e.house_type + "| " + e.average_price + "元/平米" + e.tprice + " 均价"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});