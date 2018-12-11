var app = getApp();

Page({
    data: {
        article: {},
        aid: 0
    },
    onLoad: function(a) {
        var t = this;
        app.kbtools.isnull(a.id) || t.setData({
            aid: a.id
        }), app.util.request({
            url: "entry/wxapp/article",
            cachetime: "0",
            showLoading: !1,
            data: {
                aid: t.data.aid,
                enews: "show"
            },
            success: function(a) {
                t.setData({
                    article: a.data.data
                });
            }
        }), app.kbtools.siteAdvancise(app, t);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});