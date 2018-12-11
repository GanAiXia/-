var app = getApp();

Page({
    data: {
        newhouse_id: 0,
        house: {},
        storage: {}
    },
    getHouseInfo: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/newshop",
            cachetime: "60",
            data: {
                id: e.data.newhouse_id
            },
            success: function(t) {
                e.setData({
                    house: t.data.data.house
                }), wx.setNavigationBarTitle({
                    title: t.data.data.house.house_title + " 基本资料"
                });
            }
        });
    },
    onLoad: function(t) {
        this.setData({
            newhouse_id: parseInt(t.hid)
        }), this.getHouseInfo();
        var e = this;
        wx.getStorage({
            key: "shop",
            success: function(t) {
                e.setData({
                    storage: t.data
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