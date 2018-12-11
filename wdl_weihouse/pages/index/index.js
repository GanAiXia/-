var app = getApp(), tools = require("../../static/tools.js");

Page({
    data: {
        banner: [],
        channel: [ {
            icon_url: "/addons/wdl_esfroom/style/images/ic_menu_choice_pressed.png",
            url: "../house/search",
            name: "男士征婚"
        }, {
            icon_url: "/addons/wdl_esfroom/style/images/ic_menu_shoping_pressed.png",
            url: "../house/zhu",
            name: "女士征婚"
        }, {
            icon_url: "/addons/wdl_esfroom/style/images/ic_menu_sort_pressed.png",
            url: "../house/search?hot=1",
            name: "精选房"
        }, {
            icon_url: "/addons/wdl_esfroom/style/images/icon_collect_checked.png",
            url: "../house/favorite",
            name: "收藏夹"
        } ],
        hotHouse: [],
        hotzhu: [],
        siteroot: ""
    },
    onLoad: function(e) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/limithouse",
            cachetime: "30",
            showLoading: !1,
            data: {
                "fkey[rent_type]": 0,
                limit: 20,
                "fkey[istop]": 1
            },
            success: function(e) {
                t.setData({
                    hotHouse: e.data.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/limithouse",
            cachetime: "30",
            showLoading: !1,
            data: {
                "fkey[rent_type]": 2,
                limit: 20,
                "fkey[istop]": 1
            },
            success: function(e) {
                t.setData({
                    hotzhu: e.data.data
                });
            }
        });
    },
    onReady: function() {
        var t = this;
        app.util.footer(t), t.setData({
            siteroot: tools.url_to_host(app.siteInfo.siteroot)
        }), app.util.request({
            url: "entry/wxapp/settingData",
            cachetime: "30",
            showLoading: !1,
            data: {
                "fkey[0]": "logo",
                "fkey[1]": "banner",
                "fkey[2]": "shopname"
            },
            success: function(e) {
                wx.setStorage({
                    key: "shop",
                    data: e.data.data,
                    success: function() {
                        wx.setNavigationBarTitle({
                            title: e.data.data.shopname
                        });
                    }
                }), t.setData({
                    banner: [ {
                        link: "",
                        url: e.data.data.logo
                    }, {
                        link: "",
                        url: e.data.data.banner
                    } ]
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