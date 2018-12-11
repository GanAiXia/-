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
        var o = this;
        app.util.request({
            url: "entry/wxapp/share",
            showLoading: !0,
            data: {
                page: o.data.page,
                op: "mytree",
                total: o.data.total
            },
            success: function(a) {
                var t = o.data.salelist;
                t = 1 < o.data.page ? t.concat(a.data.data.salelist) : a.data.data.salelist;
                var e = "查看更多动态";
                0 == a.data.data.salelist.length && (e = " 没有更多哦！"), o.setData({
                    salelist: t,
                    total: a.data.data.total,
                    page: o.data.page + 1,
                    loadmore: e
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