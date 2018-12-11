var app = getApp();

Page({
    data: {
        areas_label: "区域",
        price_label: "价格",
        sufix_label: "身高",
        room_label: "是否有房",
        keyword: "",
        areas: "",
        min_price: 0,
        max_price: 0,
        min_sufix: 0,
        max_sufix: 0,
        room: 0,
        rent_type: 2,
        currentIndex: 0,
        search_areas: {},
        search_price: {},
        search_sufix: {},
        search_room: {},
        houselist: {},
        page: 1,
        islast: !1,
        istotal: !1
    },
    chagetab: function(a) {
        var t = a.currentTarget.dataset;
        this.data.currentIndex == t.index && (t.index = 0), this.setData({
            currentIndex: t.index
        });
    },
    search_nav: function(a) {
        var t = a.currentTarget.dataset, e = t.label;
        if ("不限制" == t.label && (e = {
            areas: "区域",
            price: "价格",
            sufix: "身高",
            room: "是否有房"
        }[t.index]), 1 == t.type) var s = t.txt.split("-"); else if (0 == t.type) s = t.txt;
        "price" == t.index ? this.setData({
            min_price: s[0],
            max_price: s[1],
            price_label: e
        }) : "sufix" == t.index ? this.setData({
            min_sufix: s[0],
            max_sufix: s[1],
            sufix_label: e
        }) : "areas" == t.index ? this.setData({
            areas: s,
            areas_label: e
        }) : "room" == t.index && this.setData({
            room: s,
            room_label: e
        }), this.setData({
            currentIndex: 0,
            houselist: [],
            page: 1,
            islast: !1,
            istotal: !1
        }), this.search_house();
    },
    search_params: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/searchkey",
            data: {
                type: 2
            },
            cachetime: "30",
            success: function(a) {
                console.log(a), t.setData({
                    search_areas: a.data.data.areas,
                    search_price: a.data.data.price,
                    search_sufix: a.data.data.sufix,
                    search_room: a.data.data.room
                });
            }
        });
    },
    search_house: function() {
        var e = this;
        e.data.islast = !0, app.util.request({
            url: "entry/wxapp/search",
            cachetime: "30",
            data: {
                area: e.data.areas,
                minprice: e.data.min_price,
                maxprice: e.data.max_price,
                minsufix: e.data.min_sufix,
                maxsufix: e.data.max_sufix,
                room: e.data.room,
                keyword: e.data.keyword,
                page: e.data.page,
                rent_type: e.data.rent_type
            },
            success: function(a) {
                0 < a.data.data.length ? e.setData({
                    istotal: !1
                }) : e.setData({
                    istotal: !0
                });
                var t = e.data.houselist;
                1 < e.data.page ? (t = t.concat(a.data.data), console.log("contact")) : t = a.data.data, 
                e.setData({
                    houselist: t
                });
            }
        });
    },
    search_keyword: function(a) {
        this.setData({
            keyword: a.detail.value
        });
    },
    onLoad: function(a) {
        this.search_params(), this.search_house();
    },
    onReady: function() {
        app.util.footer(this), wx.getStorage({
            key: "shop",
            success: function(a) {
                wx.setNavigationBarTitle({
                    title: a.data.shopname + "女士征婚"
                });
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.data.istotal || (this.data.page = this.data.page + 1, this.search_house());
    },
    onShareAppMessage: function() {}
});