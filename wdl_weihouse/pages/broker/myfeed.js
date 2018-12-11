var app = getApp();

Page({
    data: {
        ftype: "feed",
        feedlist: []
    },
    loaddata: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/feed",
            cachetime: "0",
            data: {
                ftype: a.data.ftype,
                isbroker: 1
            },
            success: function(t) {
                a.setData({
                    feedlist: t.data.data
                });
            }
        });
    },
    deleteinfo: function(t) {
        var a = this, e = t.currentTarget.dataset.infoid;
        wx.showModal({
            title: "提示",
            content: "确定要删除吗？",
            success: function(t) {
                t.confirm ? a.loaddata(e) : t.cancel;
            }
        });
    },
    tabnav: function(t) {
        var a = t.currentTarget.dataset.ftype;
        this.setData({
            ftype: a
        }), this.loaddata();
    },
    onLoad: function(t) {
        app.kbtools.isnull(t.ftype) || this.setData({
            ftype: t.ftype
        }), this.loaddata();
    },
    onReady: function() {
        wx.getStorage({
            key: "shop",
            success: function(t) {
                wx.setNavigationBarTitle({
                    title: t.data.shopname + "经纪人助手"
                });
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.loaddata(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});