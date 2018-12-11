var app = getApp();

Page({
    data: {
        keyboard: 1,
        flage: !1,
        areas_label: "区域",
        price_label: "价格",
        sufix_label: "身高",
        room_label: "房型",
        moretype_label: "更多",
        moretype: {},
        keyword: "",
        areas: "",
        min_price: 0,
        max_price: 0,
        min_sufix: 0,
        max_sufix: 0,
        room: 0,
        rent_type: 0,
        onsale: "",
        house_nature: "",
        house_type: "",
        opentime: "",
        sort_order: 1,
        currentIndex: 0,
        search_areas: {},
        search_price: {},
        search_sufix: {},
        search_room: {},
        search_order: {},
        search_housetags: {},
        search_projectTypes: {},
        search_opentime: {},
        houselist: {},
        page: 1,
        islast: !1,
        isjingping: 0,
        istotal: !1
    },
    chagetab: function(a) {
        var e = a.currentTarget.dataset;
        this.data.currentIndex == e.index && (e.index = 0), this.setData({
            currentIndex: e.index
        });
    },
    search_nav: function(a) {
        var e = a.currentTarget.dataset, t = e.label;
        if ("不限制" == e.label && (t = {
            areas: "区域",
            price: "价格",
            room: "房型",
            moretype: "更多",
            order: "排序"
        }[e.index]), 1 == e.type) var s = e.txt.split("-"); else if (0 == e.type) s = e.txt;
        "price" == e.index ? this.setData({
            min_price: s[0],
            max_price: s[1],
            price_label: t
        }) : "sufix" == e.index ? this.setData({
            min_sufix: s[0],
            max_sufix: s[1],
            sufix_label: t
        }) : "areas" == e.index ? this.setData({
            areas: s,
            areas_label: t
        }) : "room" == e.index ? this.setData({
            room: s,
            room_label: t
        }) : "keyword" == e.index ? this.setData({
            keyword: a.detail.value
        }) : "order" == e.index && this.setData({
            sort_order: s
        }), this.setData({
            currentIndex: 0,
            houselist: [],
            page: 1,
            islast: !1,
            istotal: !1
        }), this.search_house();
    },
    changeBtnStatus: function(a) {
        var e = this, t = a.currentTarget.dataset, s = e.data.house_nature, r = e.data.house_type, o = e.data.onsale, i = e.data.opentime;
        "house_nature" == t.index && (s = s == t.txt ? "" : t.txt), "house_type" == t.index && (r = r == t.txt ? "" : t.txt), 
        "onsale" == t.index && (o = o == t.txt ? "" : t.txt), "opentime" == t.index && (i = i == t.txt ? "0" : t.txt), 
        e.setData({
            house_nature: s,
            house_type: r,
            onsale: o,
            opentime: i
        });
    },
    search_params: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/searchkey",
            data: {
                type: 1
            },
            cachetime: "60",
            success: function(a) {
                e.setData({
                    search_areas: a.data.data.areas,
                    search_price: a.data.data.price,
                    search_sufix: a.data.data.sufix,
                    search_room: a.data.data.mainhouse,
                    search_order: a.data.data.order,
                    search_housetags: a.data.data.housetags,
                    search_projectTypes: a.data.data.projectTypes,
                    search_opentime: a.data.data.opentime
                });
            }
        });
    },
    search_house: function() {
        var t = this;
        t.setData({
            islast: !0
        }), wx.showLoading({
            title: "加载数据中！"
        }), app.util.request({
            url: "entry/wxapp/searchNewhouse",
            showLoading: !1,
            data: {
                area: t.data.areas,
                minprice: t.data.min_price,
                maxprice: t.data.max_price,
                minsufix: t.data.min_sufix,
                maxsufix: t.data.max_sufix,
                room: t.data.room,
                keyword: t.data.keyword,
                page: t.data.page,
                rent_type: t.data.rent_type,
                isjingping: t.data.isjingping,
                sort_order: t.data.sort_order,
                onsale: t.data.onsale,
                house_nature: t.data.house_nature,
                house_type: t.data.house_type,
                opentime: t.data.opentime
            },
            success: function(a) {
                0 < a.data.data.length ? t.setData({
                    istotal: !1
                }) : t.setData({
                    istotal: !0
                });
                var e = t.data.houselist;
                1 < t.data.page ? (e = e.concat(a.data.data), console.log("contact")) : e = a.data.data, 
                t.setData({
                    houselist: e,
                    islast: !1
                }), wx.hideLoading();
            }
        });
    },
    search_keyword: function(a) {
        this.setData({
            keyword: a.detail.value
        });
    },
    onLoad: function(a) {
        var e = this;
        app.kbtools.isnull(a.areas) || this.setData({
            areas: a.areas
        }), e.search_params(), e.search_house(), app.kbtools.siteAdvancise(app, e);
    },
    onReady: function() {
        app.util.footer(this), wx.getStorage({
            key: "shop",
            success: function(a) {
                wx.setNavigationBarTitle({
                    title: a.data.shopname + " 新房"
                });
            }
        });
    },
    onPageScroll: function(a) {
        this.data.keyboard;
        var e = this.data.flage;
        20 < a.scrollTop ? e || this.setData({
            keyboard: 0,
            flage: !0
        }) : e && this.setData({
            keyboard: 1,
            flage: !1
        });
    },
    onShow: function() {
        console.log("onShow");
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            page: 1
        }), this.search_house(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        var a = this;
        return a.data.istotal || (this.setData({
            page: a.data.page + 1
        }), a.search_house()), !0;
    },
    onShareAppMessage: function() {}
});