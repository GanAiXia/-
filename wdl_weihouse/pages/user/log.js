var app = getApp();

Page({
    data: {
        result: [],
        prive: {},
        type: 1,
        sql: ""
    },
    loadingrecord: function() {
        var a = this, t = (a.data.type, a.data.sql);
        app.util.request({
            url: "entry/wxapp/Actlog",
            data: {
                sql: t,
                limit: 100
            },
            cachetime: "0",
            success: function(t) {
                a.setData({
                    result: t.data.data.result,
                    prive: t.data.data.prive
                });
            }
        });
    },
    onLoad: function(t) {
        var a = this, e = a.data.type;
        app.kbtools.isnull(t.type) || (e = t.type);
        var o = "";
        1 == e && (o = "(acttype=2 or acttype=3)"), 2 == e && (o = "(acttype=7 or acttype=8)"), 
        a.setData({
            type: e,
            sql: o
        }), a.loadingrecord();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            result: []
        }), this.loadingrecord(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});