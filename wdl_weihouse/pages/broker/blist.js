var app = getApp();

Page({
    data: {
        category: [],
        result: [],
        shopid: 0,
        tags: 0,
        total: 0,
        page: 1,
        keyword: "",
        loadmore: "查看更多"
    },
    load_salelist: function() {
        var o = this;
        wx.showLoading({
            title: "加载数据中！"
        }), app.util.request({
            url: "entry/wxapp/brokerlist",
            showLoading: !1,
            data: {
                page: o.data.page,
                tags: o.data.tags,
                keyword: o.data.keyword,
                shopid: o.data.shopid
            },
            success: function(a) {
                var t = o.data.result;
                t = 1 < o.data.page ? t.concat(a.data.data.result) : a.data.data.result;
                var e = "查看更多";
                0 == a.data.data.result.length && (e = "这是底线了，没有更多哦！"), wx.hideLoading(), o.setData({
                    result: t,
                    total: a.data.data.total,
                    page: o.data.page + 1,
                    loadmore: e
                }), wx.setNavigationBarTitle({
                    title: " 经纪人"
                });
            }
        });
    },
    callbroker: function(a) {
        var t = a.currentTarget.dataset;
        "undefined" == t.phone ? wx.showToast({
            title: "房源未填写电话号码"
        }) : wx.makePhoneCall({
            phoneNumber: t.phone
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
            shopid: parseInt(a.sid)
        }), this.load_salelist();
    },
    onReady: function() {
        app.setbottom_bar(this);
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            page: 1
        }), this.load_salelist(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.load_salelist();
    },
    onShareAppMessage: function() {}
});