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
        var e = this;
        app.util.request({
            url: "entry/wxapp/share",
            showLoading: !0,
            data: {
                page: e.data.page,
                op: "myshare",
                total: e.data.total
            },
            success: function(a) {
                var t = e.data.salelist;
                t = 1 < e.data.page ? t.concat(a.data.data.salelist) : a.data.data.salelist;
                var o = "查看更多动态";
                0 == a.data.data.salelist.length && (o = " 没有更多哦！"), e.setData({
                    salelist: t,
                    total: a.data.data.total,
                    page: e.data.page + 1,
                    loadmore: o
                });
            }
        });
    },
    onLoad: function(a) {
        this.load_salelist();
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