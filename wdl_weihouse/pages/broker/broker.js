var app = getApp();

Page({
    data: {
        broker: {},
        bid: 0,
        keyword: "",
        rent_type: 0,
        result: [],
        currentTab: 0,
        page: 1,
        total: 0
    },
    search_keyword: function(t) {
        this.setData({
            keyword: t.detail.value,
            page: 1,
            total: 0
        });
    },
    search_goto: function(t) {
        this.brokerinfo();
    },
    brokerinfo: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/broker",
            data: {
                enews: "getinfo",
                bid: a.data.bid
            },
            showLoading: !1,
            success: function(t) {
                200 == t.statusCode && (console.log(t.data.data), a.setData({
                    broker: t.data.data
                }));
            }
        });
    },
    swichNav: function(t) {
        if (this.data.currentTab === t.target.dataset.current) return !1;
        this.setData({
            currentTab: t.target.dataset.current,
            rent_type: t.target.dataset.current
        }), this.reload_list();
    },
    reload_list: function() {
        this.setData({
            page: 1,
            result: []
        }), this.load_salelist();
    },
    load_salelist: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/secsearch",
            showLoading: !0,
            data: {
                page: a.data.page,
                tags: a.data.tags,
                keyword: a.data.keyword,
                isbroker: 1,
                bid: a.data.bid,
                rent_type: a.data.rent_type
            },
            success: function(t) {
                a.search_callback(t);
            }
        });
    },
    search_callback: function(t) {
        var a = this, e = a.data.result;
        e = 1 < a.data.page ? e.concat(t.data.data) : t.data.data;
        var o = "查看更多";
        0 == t.data.data.length && (o = "没有更多哦！"), a.setData({
            result: e,
            page: a.data.page + 1,
            loadmore: o
        });
    },
    onLoad: function(t) {
        app.kbtools.isnull(t.id) ? wx.redirectTo({
            url: "../broker/blist"
        }) : (this.setData({
            bid: parseInt(t.id)
        }), this.brokerinfo(), this.load_salelist()), app.kbtools.siteAdvancise(app, this);
    },
    onDefRedirect: function(t) {
        app.kbtools.defRedirect(this, t);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reload_list(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});