var app = getApp(), tools = require("../../static/tools.js");

Page({
    data: {
        banner: [],
        channel: [],
        hotHouse: [],
        hotzhu: [],
        newhouse: [],
        siteroot: "",
        storage: {},
        adinfo: []
    },
    onPageInitData: function() {
        var h = this;
        app.util.request({
            url: "entry/wxapp/enset",
            cachetime: "0",
            showLoading: !1,
            data: {
                placeids: "1,2,4,5,6,11"
            },
            success: function(e) {
                var a = e.data.data, t = h.storage, n = [];
                if (!app.kbtools.isnull(a.banner)) for (var o in a.banner.image) app.kbtools.isnull(a.banner.image[o]) || n.push({
                    link: a.banner.link[o],
                    url: a.banner.image[o]
                });
                0 == n.length && (t.logo, t.banner);
                var s = 0, i = 0, u = 1;
                app.kbtools.isnull(a.confmenu.index_searchbar) || (s = 1), app.kbtools.isnull(a.confmenu.index_tongji) || (i = 1), 
                app.kbtools.isnull(a.confmenu.indexslide) || (u = 0);
                var c = "新房", p = "您想把家住哪？", l = 1, r = "../newshop/search";
                app.kbtools.isnull(a.confmenu.index_searchbar_txt) || (c = a.confmenu.index_searchbar_txt), 
                app.kbtools.isnull(a.confmenu.index_search_place) || (p = a.confmenu.index_search_place), 
                app.kbtools.isnull(a.confmenu.index_searchbar_jump) || (r = 1 == (l = a.confmenu.index_searchbar_jump) ? "../newshop/search" : 2 == l ? "../house/search" : 3 == l ? "../house/zhu" : "../newshop/search"), 
                h.setData({
                    banner: n,
                    index_search: s,
                    index_tongji: i,
                    index_slide_show: u,
                    pagedata: a,
                    index_searchbar_txt: c,
                    index_search_place: p,
                    index_searchbar_jump: l,
                    index_searchbar_jump_url: r
                });
            }
        }), app.util.request({
            url: "entry/wxapp/enset",
            cachetime: "0",
            showLoading: !1,
            data: {
                op: "navmenu"
            },
            success: function(e) {
                h.setData({
                    navmenu: e.data.data
                });
            }
        }), app.kbtools.siteAdvancise(app, h);
    },
    onLoad: function(e) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/runtask",
            cachetime: "0",
            success: function(e) {}
        }), app.kbtools.get_settingdata(a, function(e) {
            wx.setNavigationBarTitle({
                title: e.data.shopname
            }), a.setData({
                storage: e.data
            });
        }), a.onPageInitData(), app.kbtools.isnull(e.scene) || wx.navigateTo({
            url: "/wdl_weihouse/pages/share/agent?scence=" + e.scene
        }), app.util.request({
            url: "entry/wxapp/newhouseByfield",
            cachetime: "30",
            showLoading: !1,
            data: {
                limit: 5
            },
            success: function(e) {
                a.setData({
                    newhouse: e.data.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/limithouse",
            cachetime: "10",
            showLoading: !1,
            data: {
                "fkey[rent_type]": 0,
                limit: 20,
                "fkey[isjingpin]": 1,
                "fkey[zhutype]": 0
            },
            success: function(e) {
                a.setData({
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
                "fkey[isjingpin]": 1,
                "fkey[zhutype]": 0
            },
            success: function(e) {
                a.setData({
                    hotzhu: e.data.data
                });
            }
        }), app.kbtools.isnull(e.share) || wx.navigateTo({
            url: "/wdl_weihouse/pages/newshop/index?id=" + e.id
        });
    },
    bindtap_qiandao: function(e) {
        app.checkAuthorLogin(this, "/wdl_weihouse/pages/index/welcome", function() {
            app.util.request({
                url: "entry/wxapp/qiandao",
                cachetime: "0",
                showLoading: !1,
                data: {},
                success: function(e) {
                    wx.showModal({
                        title: "签到提示",
                        content: e.data.data,
                        showCancel: !1
                    });
                }
            });
        });
    },
    onReady: function() {
        this.setData({
            siteroot: app.kbtools.url_to_host(app.siteInfo.siteroot)
        }), wx.setTabBarItem({
            index: 4,
            text: "text",
            iconPath: "/path/to/iconPath",
            selectedIconPath: "/path/to/selectedIconPath"
        });
    },
    onDefRedirect: function(e) {
        app.kbtools.defRedirect(this, e);
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.onPageInitData(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: this.data.storage.shopname,
            desc: "",
            path: "/wdl_weihouse/pages/index/welcome"
        };
    }
});