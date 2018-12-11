var app = getApp();

Page({
    data: {
        id: 0,
        newhouse_id: 0,
        room: {},
        storage: {}
    },
    getHouseInfo: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/houseroom",
            cachetime: "60",
            data: {
                roomid: e.data.id,
                newhouse_id: e.data.newhouse_id
            },
            success: function(t) {
                e.setData({
                    room: t.data.data
                }), wx.setNavigationBarTitle({
                    title: t.data.data.roominfo.title + "-" + t.data.data.house_name
                });
            }
        });
    },
    onPreviewImage: function(t) {
        var e = t.currentTarget.dataset.view, a = t.currentTarget.dataset.type, o = this.data.room;
        "yangban" == a && wx.previewImage({
            content: e,
            urls: o.yangban
        }), "thumbs" == a && (o.thumbs.push(o.roominfo.thumb), wx.previewImage({
            content: e,
            urls: o.thumbs
        }));
    },
    callbroker: function(t) {
        var e = t.currentTarget.dataset;
        "undefined" == e.phone ? wx.showToast({
            title: "房源未填写销售热线"
        }) : wx.makePhoneCall({
            phoneNumber: e.phone
        });
    },
    onLoad: function(t) {
        this.setData({
            id: parseInt(t.id),
            newhouse_id: t.hid
        }), this.getHouseInfo();
        var e = this;
        wx.getStorage({
            key: "shop",
            success: function(t) {
                e.setData({
                    storage: t.data
                });
            }
        }), app.kbtools.siteAdvancise(app, self);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});