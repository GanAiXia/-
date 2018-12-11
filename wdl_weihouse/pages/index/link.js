var app = getApp();

Page({
    data: {
        share_url: ""
    },
    onLoad: function(n) {
        if (!app.kbtools.isnull(n.href)) {
            var o = decodeURIComponent(n.href);
            console.log(o), this.setData({
                share_url: o
            });
        }
    },
    onShareAppMessage: function() {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});