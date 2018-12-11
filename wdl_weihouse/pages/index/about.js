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
        loadmore: "查看更多",
        showRightMenuOk: !0,
        hiddendialog: !0,
        positon: ""
    },
    load_salelist: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/settingData",
            cachetime: "60",
            showLoading: !1,
            data: {
                "fkey[0]": "logo",
                "fkey[1]": "banner",
                "fkey[2]": "shopname",
                "fkey[3]": "copyinfo",
                "fkey[4]": "cityprice",
                "fkey[5]": "saletotal"
            },
            success: function(t) {
                a.setData({
                    result: t.data.data
                });
            }
        }), app.kbtools.siteAdvancise(app, a);
    },
    trigger_dialog: function(t) {
        var a = t.currentTarget.dataset.view;
        this.data.hiddendialog;
        app.kbtools.isnull(a) ? this.setData({
            hiddendialog: !0
        }) : this.setData({
            positon: "top: 300rpx",
            kefu_ercode: a,
            hiddendialog: !1
        });
    },
    onLoad: function(t) {
        this.setData({
            shopid: parseInt(t.sid)
        }), this.load_salelist();
    },
    showMapLocation: function(t) {
        var a = "", e = this.data.result.settingdata.shopname, o = this.data.result.settingdata.city_point;
        o && (a = o), app.showMapLocation(a, e);
    },
    callbroker: function(t) {
        var a = t.currentTarget.dataset;
        "undefined" == a.phone ? wx.showToast({
            title: "房源未填写销售热线"
        }) : wx.makePhoneCall({
            phoneNumber: a.phone
        });
    },
    onDefRedirect: function(t) {
        app.kbtools.defRedirect(this, t);
    },
    onReady: function() {
        app.setbottom_bar(this);
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.load_salelist(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});