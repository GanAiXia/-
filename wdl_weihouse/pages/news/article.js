var app = getApp();

Page({
    data: {
        category: [],
        salelist: [],
        newhouse_id: 0,
        tags: 0,
        total: 0,
        page: 1,
        keyword: "",
        loadmore: "查看更多动态"
    },
    load_salelist: function() {
        var s = this;
        app.util.request({
            url: "entry/wxapp/article",
            showLoading: !0,
            data: {
                page: s.data.page,
                tags: s.data.tags,
                keyword: s.data.keyword,
                total: s.data.total
            },
            success: function(a) {
                var t = s.data.salelist;
                t = 1 < s.data.page ? t.concat(a.data.data.salelist) : a.data.data.salelist;
                var e = "查看更多动态";
                0 == a.data.data.salelist.length && (e = " 没有更多哦！"), s.setData({
                    salelist: t,
                    total: a.data.data.total,
                    page: s.data.page + 1,
                    loadmore: e
                }), wx.setNavigationBarTitle({
                    title: " 资讯"
                });
            }
        });
    },
    fetch_category: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/article",
            showLoading: !0,
            data: {
                enews: "category"
            },
            success: function(a) {
                t.setData({
                    category: a.data.data
                });
            }
        });
    },
    change_category: function(a) {
        var t = a.currentTarget.dataset;
        this.setData({
            tags: t.index,
            page: 1,
            total: 0
        }), this.load_salelist();
    },
    search_keyword: function(a) {
        this.setData({
            keyword: a.detail.value,
            page: 1,
            total: 0
        });
    },
    search_goto: function(a) {
        this.setData({
            total: 0,
            page: 1
        }), this.load_salelist();
    },
    onLoad: function(a) {
        this.setData({
            newhouse_id: parseInt(a.hid)
        });
        var o = this;
        app.util.request({
            url: "entry/wxapp/enset",
            cachetime: "300",
            showLoading: !1,
            data: {
                placeids: "21"
            },
            success: function(a) {
                var t = a.data.data, e = [];
                if (!app.kbtools.isnull(t.slide_news)) for (var s in t.slide_news.image) app.kbtools.isnull(t.slide_news.image[s]) || e.push({
                    link: t.slide_news.link[s],
                    url: t.slide_news.image[s]
                });
                o.setData({
                    banner: e,
                    pagedata: t
                });
            }
        }), this.fetch_category(), this.load_salelist();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            page: 1,
            tags: 0
        }), this.load_salelist(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.load_salelist();
    },
    onShareAppMessage: function() {}
});