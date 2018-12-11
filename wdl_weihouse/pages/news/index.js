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
        wx.showLoading({
            title: "加载数据中！"
        }), app.util.request({
            url: "entry/wxapp/newsale",
            showLoading: !1,
            data: {
                page: s.data.page,
                tags: s.data.tags,
                keyword: s.data.keyword
            },
            success: function(a) {
                var t = s.data.salelist;
                t = 1 < s.data.page ? t.concat(a.data.data.salelist) : a.data.data.salelist;
                var e = "查看更多动态";
                0 == a.data.data.salelist.length && (e = "这是底线了，没有更多哦！"), wx.hideLoading(), s.setData({
                    category: a.data.data.category,
                    salelist: t,
                    total: a.data.data.total,
                    page: s.data.page + 1,
                    loadmore: e
                }), wx.setNavigationBarTitle({
                    title: " 楼市动态"
                });
            }
        });
    },
    change_category: function(a) {
        var t = a.currentTarget.dataset;
        this.setData({
            tags: t.index,
            page: 1
        }), this.load_salelist();
    },
    search_keyword: function(a) {
        this.setData({
            keyword: a.detail.value,
            page: 1
        });
    },
    search_goto: function(a) {
        this.load_salelist();
    },
    onLoad: function(a) {
        this.setData({
            newhouse_id: parseInt(a.hid)
        }), this.load_salelist();
        var o = this;
        app.util.request({
            url: "entry/wxapp/enset",
            cachetime: "300",
            showLoading: !1,
            data: {
                placeids: "22"
            },
            success: function(a) {
                var t = a.data.data, e = [];
                if (!app.kbtools.isnull(t.slide_house)) for (var s in t.slide_house.image) app.kbtools.isnull(t.slide_house.image[s]) || e.push({
                    link: t.slide_house.link[s],
                    url: t.slide_house.image[s]
                });
                o.setData({
                    banner: e,
                    pagedata: t
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            page: 1
        }), this.load_salelist(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});