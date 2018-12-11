var app = getApp();

Page({
    data: {
        share_url: ""
    },
    onLoad: function(o) {
        var t = this, e = "newshop", a = 0, i = 0;
        app.kbtools.isnull(o.cate) || (e = o.cate), app.kbtools.isnull(o.id) || (a = parseInt(o.id)), 
        wx.getStorage({
            key: "userInfo",
            success: function(o) {
                app.kbtools.isnull(o.data.memberInfo) || (i = o.data.memberInfo.uid);
                var n = app.kbtools.url_to_host(app.siteInfo.siteroot);
                t.setData({
                    share_url: n + "/app/index.php?i=" + app.siteInfo.uniacid + "&c=entry&m=wdl_weihouse&do=share&category=" + e + "&infoid=" + a + "&uid=" + i
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});