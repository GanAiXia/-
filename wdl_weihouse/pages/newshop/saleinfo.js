var app = getApp();

Page({
    data: {
        category: [],
        salelist: [],
        newhouse_id: 0,
        tags: 0,
        total: 0,
        page: 1,
        loadmore: "查看更多动态"
    },
    load_salelist: function() {
        var o = this;
        wx.showLoading({
            title: "加载数据中！"
        }), app.util.request({
            url: "entry/wxapp/salelist",
            showLoading: !1,
            data: {
                newhouse_id: o.data.newhouse_id,
                page: o.data.page,
                tags: o.data.tags
            },
            success: function(a) {
                var t = o.data.salelist;
                t = 1 < o.data.page ? t.concat(a.data.data.salelist) : a.data.data.salelist;
                var e = "查看更多动态";
                0 == a.data.data.salelist.length && (e = "这是底线了，没有更多哦！"), wx.hideLoading(), o.setData({
                    category: a.data.data.category,
                    salelist: t,
                    total: a.data.data.total,
                    page: o.data.page + 1,
                    loadmore: e
                }), wx.setNavigationBarTitle({
                    title: a.data.data.house_name + " 销售动态"
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
    onLoad: function(a) {
        this.setData({
            newhouse_id: parseInt(a.hid)
        }), this.load_salelist();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});