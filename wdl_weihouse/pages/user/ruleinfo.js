var app = getApp();

Page({
    data: {
        type: 1
    },
    userprive: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/userprive",
            cachetime: "0",
            showLoading: !1,
            data: {},
            success: function(t) {
                console.log(t), n.setData({
                    prive: t.data.data
                });
            }
        });
    },
    onLoad: function(t) {
        var n = this, o = n.data.type;
        console.log(t), app.kbtools.isnull(t.type) || (o = t.type), n.setData({
            type: o
        }), n.userprive();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});