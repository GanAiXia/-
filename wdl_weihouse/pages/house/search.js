var app = getApp();

Page({
    data: {
        areas_label: "区域",
        price_label: "总价",
        sufix_label: "身高",
        room_label: "是否有房",
        keyboard: 1,
        flage: !1,
        keyword: "",
        areas: "",
        min_price: 0,
        max_price: 0,
        min_sufix: 0,
        max_sufix: 0,
        room: 0,
        rent_type: 0,
        order: 0,
        zhutype: 0,
        currentIndex: 0,
        sboxli: [ "不限制", "不限制", "不限制", "不限制" ],
        sboxmore: [ "0", "0", "0", "0", "0", "0" ],
        houselist: {},
        page: 1,
        islast: !1,
        isjingping: 0,
        istotal: !1,
        tophouse: [],
        hiddendialog: !0,
        positon: ""
    },
    onDefRedirect: function(e) {
        app.kbtools.defRedirect(this, e);
    },
    trigger_dialog: function(e) {
        console.log(e);
        var t = e.currentTarget.dataset.name, a = this.data.hiddendialog;
        this.setData({
            hiddendialog: !a,
            positon: "top: 300rpx",
            dialog: {
                shownav: {
                    title: "请选择想要查找的房源类型",
                    items: [ {
                        name: "出售",
                        url: "../house/search?rent=0&zhutype=0",
                        opentype: "redirect"
                    }, {
                        name: "女士征婚",
                        url: "../house/zhu?rent=2&zhutype=2",
                        opentype: "redirect"
                    }, {
                        name: "写字楼出租",
                        url: "../house/xie?rent=2&zhutype=1",
                        opentype: "redirect"
                    }, {
                        name: "写字楼出售",
                        url: "../house/xie?rent=0&zhutype=1",
                        opentype: "redirect"
                    }, {
                        name: "商铺出租",
                        url: "../house/sp?rent=2&zhutype=2",
                        opentype: "redirect"
                    }, {
                        name: "商铺出售",
                        url: "../house/sp?rent=0&zhutype=2",
                        opentype: "redirect"
                    }, {
                        name: "生意转让",
                        url: "../house/syi?rent=0&zhutype=3",
                        opentype: "redirect"
                    } ]
                }
            }[t]
        });
    },
    chagetab: function(e) {
        var t = e.currentTarget.dataset;
        this.data.currentIndex == t.index && (t.index = 0), this.setData({
            currentIndex: t.index
        });
    },
    search_nav_rest: function(e) {
        this.setData({
            sboxmore: [ "0", "0", "0", "0", "0", "0" ]
        });
    },
    search_nav: function(e) {
        var t = e.currentTarget.dataset, a = t.label;
        if ("不限制" == t.label && (a = {
            areas: "区域",
            price: "总价",
            sufix: "身高",
            room: "是否有房"
        }[t.index]), 1 == t.type) {
            var s = [];
            0 < t.txt.indexOf("-") ? s = t.txt.split("-") : s[0] = s[1] = 0;
        } else if (0 == t.type) s = t.txt;
        "price" == t.index ? this.setData({
            min_price: s[0],
            max_price: s[1],
            price_label: a
        }) : "sufix" == t.index ? this.setData({
            min_sufix: s[0],
            max_sufix: s[1],
            sufix_label: a
        }) : "areas" == t.index ? this.setData({
            areas: s,
            areas_label: a
        }) : "room" == t.index ? this.setData({
            room: s,
            room_label: a
        }) : "keyword" == t.index ? this.setData({
            keyword: e.detail.value
        }) : "order" == t.index && this.setData({
            order: s
        });
        var i = this.data.sboxli;
        i[this.data.currentIndex] = t.txt, this.setData({
            currentIndex: 0,
            houselist: [],
            page: 1,
            islast: !1,
            istotal: !1,
            sboxli: i
        }), this.search_house_top(), this.search_house(0);
    },
    search_params: function() {
        var s = this;
        app.util.request({
            url: "entry/wxapp/searchkey",
            cachetime: "30",
            data: {
                type: 0
            },
            success: function(e) {
                var t = e.data.data, a = {
                    flextab: [ {
                        label: "区域",
                        index: 1
                    }, {
                        label: "总价",
                        index: 2
                    }, {
                        label: "身高",
                        index: 3
                    }, {
                        label: "更多",
                        index: 4
                    } ],
                    flexcon: [ {
                        showkey: 1,
                        sboxtitle: [ {
                            label: "区域搜房",
                            sort: 1
                        }, {
                            label: "地图找房",
                            sort: 2,
                            url: "../map/index?tags=0"
                        } ],
                        flexli: [ {
                            index: "areas",
                            label: "不限制",
                            keytype: 0,
                            show: "不限制",
                            select: t.areas
                        } ]
                    }, {
                        showkey: 2,
                        sboxtitle: [ {
                            label: "总价",
                            sort: 2
                        } ],
                        flexli: [ {
                            index: "price",
                            label: "不限制",
                            keytype: 1,
                            show: "不限制",
                            select: t.price
                        } ]
                    }, {
                        showkey: 3,
                        sboxtitle: [ {
                            label: "身高",
                            sort: 3
                        } ],
                        flexli: [ {
                            index: "sufix",
                            label: "不限制",
                            keytype: 1,
                            show: "不限制",
                            select: t.sufix
                        } ]
                    } ],
                    sboxmore: [ {
                        index: "room",
                        label: "是否有房",
                        valuekey: 0,
                        keytype: 0,
                        show: "是否有房",
                        select: t.room
                    }, {
                        index: "housetype",
                        label: "类型",
                        valuekey: 1,
                        keytype: 0,
                        show: "类型",
                        select: t.housetype
                    }, {
                        index: "zhaungxiu",
                        label: "装修",
                        valuekey: 2,
                        keytype: 0,
                        show: "装修",
                        select: t.zhaungxiu
                    }, {
                        index: "houseyears",
                        label: "房龄",
                        valuekey: 3,
                        keytype: 0,
                        show: "房龄",
                        select: t.houseyears
                    }, {
                        index: "ptype",
                        label: "来源",
                        valuekey: 4,
                        keytype: 0,
                        show: "来源",
                        select: t.ptype
                    } ],
                    search_order: t.secorder
                };
                s.setData({
                    flextab: a,
                    searchdata: t
                });
            }
        });
    },
    changeBtnStatus: function(e) {
        var t = e.currentTarget.dataset, a = this.data.sboxmore;
        "room" == t.index && (a[0] = a[0] == t.txt ? "" : t.txt), "housetype" == t.index && (a[1] = a[1] == t.txt ? "" : t.txt), 
        "zhaungxiu" == t.index && (a[2] = a[2] == t.txt ? "" : t.txt), "houseyears" == t.index && (a[3] = a[3] == t.txt ? "" : t.txt), 
        "ptype" == t.index && (a[4] = a[4] == t.txt ? "" : t.txt), this.setData({
            sboxmore: a
        });
    },
    house_search_field: function(e, t) {
        var a = {
            area: e.data.areas,
            minprice: e.data.min_price,
            maxprice: e.data.max_price,
            minsufix: e.data.min_sufix,
            maxsufix: e.data.max_sufix,
            room: e.data.room,
            keyword: e.data.keyword,
            rent_type: e.data.rent_type,
            zhutype: e.data.zhutype,
            isjingping: e.data.isjingping,
            morefind: e.data.sboxmore,
            order: e.data.order
        };
        return 1 == t ? (a.istop = 1, a.page = 0) : (a.istop = 0, a.page = e.data.page), 
        a;
    },
    search_house_top: function() {
        var t = this, e = this.house_search_field(this, 1);
        app.util.request({
            url: "entry/wxapp/secsearch",
            cachetime: "0",
            showLoading: !0,
            data: e,
            success: function(e) {
                t.setData({
                    tophouse: e.data.data
                });
            }
        });
    },
    search_house: function() {
        var a = this;
        a.setData({
            islast: !0
        });
        var e = this.house_search_field(this, 0);
        app.util.request({
            url: "entry/wxapp/secsearch",
            cachetime: "0",
            showLoading: !0,
            data: e,
            success: function(e) {
                app.kbtools.isnull(e.data.data) ? a.setData({
                    istotal: !0
                }) : 0 < e.data.data.length && a.setData({
                    istotal: !1
                });
                var t = a.data.houselist;
                t = 1 < a.data.page ? t.concat(e.data.data) : e.data.data, a.setData({
                    houselist: t
                });
            }
        });
    },
    search_keyword: function(e) {
        this.setData({
            keyword: e.detail.value
        });
    },
    onLoad: function(e) {
        var t = this;
        app.kbtools.isnull(e.hot) || this.setData({
            isjingping: e.hot
        }), app.kbtools.isnull(e.keyword) || this.setData({
            keyword: e.keyword
        }), t.search_params(), t.search_house_top(), t.search_house(0), app.kbtools.siteAdvancise(app, t);
    },
    onPageScroll: function(e) {
        this.data.keyboard;
        var t = this.data.flage;
        20 < e.scrollTop ? t || this.setData({
            keyboard: 0,
            flage: !0
        }) : t && this.setData({
            keyboard: 1,
            flage: !1
        });
    },
    onReady: function() {
        app.util.footer(this), wx.getStorage({
            key: "shop",
            success: function(e) {
                wx.setNavigationBarTitle({
                    title: e.data.shopname + "男士征婚列表"
                });
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.search_house_top(), this.search_house(0), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.data.istotal || (this.setData({
            page: this.data.page + 1
        }), this.search_house(0));
    },
    onShareAppMessage: function() {}
});