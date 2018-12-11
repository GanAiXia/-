App({
    onLaunch: function() {},
    onShow: function() {},
    onHide: function() {},
    onError: function(e) {
        console.log(e);
    },
    kbtools: require("/wdl_weihouse/static/tools.js"),
    util: require("/we7/resource/js/util.js"),
    tabBar: {
        color: "#888",
        selectedColor: "#1ba9ba",
        borderStyle: "#fff",
        backgroundColor: "#f1f1f1",
        list: [ {
            pagePath: "/wdl_weihouse/pages/index/welcome",
            iconPath: "/we7/resource/icon/home.png",
            selectedIconPath: "/we7/resource/icon/homeselect.png",
            text: "首页"
        }, {
            pagePath: "/wdl_weihouse/pages/newshop/search",
            iconPath: "/we7/resource/icon/hotel.png",
            selectedIconPath: "/we7/resource/icon/hotelselect.png",
            text: "新房"
        }, {
            pagePath: "/wdl_weihouse/pages/house/search",
            iconPath: "/we7/resource/icon/todo.png",
            selectedIconPath: "/we7/resource/icon/todoselect.png",
            text: "男士征婚"
        }, {
            pagePath: "/wdl_weihouse/pages/index/user",
            iconPath: "/we7/resource/icon/user.png",
            selectedIconPath: "/we7/resource/icon/userselect.png",
            text: "我的"
        } ]
    },
    indextabBar: {
        color: "#888",
        selectedColor: "#1ba9ba",
        borderStyle: "#fff",
        backgroundColor: "#f1f1f1",
        list: [ {
            pagePath: "/wdl_weihouse/pages/index/welcome",
            icon: "iconfont icon-shouyefill",
            iconselect: "iconfont icon-shouyefill",
            text: "首页",
            navigate: "redirect"
        }, {
            pagePath: "/wdl_weihouse/pages/broker/secshop",
            icon: "iconfont icon-dalou",
            iconselect: "iconfont icon-dalou",
            text: "门店",
            navigate: "redirect"
        }, {
            pagePath: "/wdl_weihouse/pages/user/publish",
            icon: "iconfont icon-roundadd",
            iconselect: "iconfont icon-roundadd",
            text: "",
            extend: "publishbtn",
            navigate: "navigate"
        }, {
            pagePath: "/wdl_weihouse/pages/broker/blist",
            icon: "iconfont icon-liebiao",
            iconselect: "iconfont icon-liebiao",
            text: "经纪人",
            navigate: "redirect"
        }, {
            pagePath: "/wdl_weihouse/pages/index/user",
            icon: "iconfont icon-geren2",
            iconselect: "iconfont icon-geren2",
            text: "我的",
            navigate: "redirect"
        } ]
    },
    setbottom_bar: function(e) {
        var o = e, t = this.indextabBar;
        for (var n in t.list) t.list[n].pageUrl = t.list[n].pagePath.replace(/(\?|#)[^"]*/g, "");
        o.setData({
            indexBar: t,
            "indexBar.thisurl": o.__route__
        });
    },
    checkAuthorLogin: function(e, o, t) {
        var n = e, i = getApp();
        "string" == typeof o && wx.setStorage({
            key: "login_callback",
            data: o
        }), wx.getStorage({
            key: "userInfo",
            success: function(e) {
                var o = 0;
                i.kbtools.isnull(e.data.memberInfo) || (o = e.data.memberInfo.uid), o ? (n.setData({
                    islogin: !0
                }), "function" == typeof t && t()) : wx.redirectTo({
                    url: "/wdl_weihouse/pages/user/login"
                });
            },
            fail: function(e) {
                wx.redirectTo({
                    url: "/wdl_weihouse/pages/user/login"
                });
            }
        });
    },
    showMapLocation: function(e, o) {
        var t = getApp();
        if (t.kbtools.isnull(e)) return !1;
        if (0 < e.indexOf(",")) {
            var n = e.split(",");
            wx.openLocation({
                latitude: parseFloat(n[1]),
                longitude: parseFloat(n[0]),
                name: o,
                scale: 16
            });
        } else t.util.request({
            url: "entry/wxapp/mapparse",
            data: {
                addr: e
            },
            success: function(e) {
                t.kbtools.isnull(e.data.data.result) || wx.openLocation({
                    latitude: parseFloat(e.data.data.result[1]),
                    longitude: parseFloat(e.data.data.result[0]),
                    name: o,
                    scale: 16
                });
            }
        });
    },
    userInfo: {
        sessionid: null
    },
    siteInfo: require("siteinfo.js")
});