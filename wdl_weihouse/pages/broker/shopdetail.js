var app = getApp();

Page({
    data: {
        animationData1: {},
        animationData2: {},
        tabcurr1: "active",
        tabcurr2: "",
        category: [],
        result: [],
        shopid: 0,
        tags: 0,
        total: 0,
        page: 1,
        keyword: "",
        loadmore: "查看更多",
        shopinfo: {}
    },
    navtab: function(a) {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 100,
            timingFunction: "ease-in",
            delay: 0
        }), o = a.currentTarget.dataset.index;
        "mendian" == o ? (t.opacity(1).step(), this.setData({
            animationData1: t.export(),
            tabcurr1: "active"
        }), t.opacity(0).step(), this.setData({
            animationData2: t.export(),
            tabcurr2: ""
        })) : "ren" == o && (t.opacity(0).step(), this.setData({
            animationData1: t.export(),
            tabcurr1: ""
        }), t.opacity(1).step(), this.setData({
            animationData2: t.export(),
            tabcurr2: "active"
        }));
    },
    showMapLocation: function() {
        var a = this.data.shopinfo;
        app.showMapLocation(a.address, a.shopname);
    },
    callphone: function() {
        var a = this.data.shopinfo;
        wx.makePhoneCall({
            phoneNumber: a.telphone
        });
    },
    fetchdetail: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Secshopdetail",
            showLoading: !1,
            data: {
                shopid: t.data.shopid
            },
            success: function(a) {
                console.log(a), t.setData({
                    shopinfo: a.data.data.result
                });
            }
        });
    },
    load_salelist: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/brokerlist",
            showLoading: !1,
            data: {
                page: e.data.page,
                tags: e.data.tags,
                keyword: e.data.keyword,
                shopid: e.data.shopid,
                limit: 1e3
            },
            success: function(a) {
                var t = e.data.result;
                t = 1 < e.data.page ? t.concat(a.data.data.result) : a.data.data.result;
                var o = "查看更多";
                0 == a.data.data.result.length && (o = "这是底线了，没有更多哦！"), wx.hideLoading(), e.setData({
                    result: t,
                    total: a.data.data.total,
                    page: e.data.page + 1,
                    loadmore: o
                });
            }
        });
    },
    onLoad: function(a) {
        this.setData({
            shopid: parseInt(a.id)
        }), this.fetchdetail(), this.load_salelist();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});