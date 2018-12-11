var app = getApp();

Page({
    data: {
        latitude: 23.099994,
        longitude: 113.32452,
        markers: [],
        mapstyle: "width: 100%; height: 800rpx;",
        item: {},
        tags: 0,
        category: [ {
            tags: 0,
            name: "新房地图"
        } ]
    },
    change_category: function(t) {
        var a = t.currentTarget.dataset;
        this.setData({
            tags: a.index,
            page: 1
        }), this.sechouse_points();
    },
    citypoint: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/Mapparse",
            cachetime: "600",
            data: {},
            success: function(t) {
                app.kbtools.isnull(t.data.data.result) || a.setData({
                    latitude: t.data.data.result[1],
                    longitude: t.data.data.result[0]
                });
            }
        });
    },
    sechouse_points: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/newsmap",
            cachetime: "0",
            data: {
                tags: a.data.tags
            },
            success: function(t) {
                console.log(t), a.addMarker(t.data);
            }
        });
    },
    addMarker: function(t) {
        for (var a = [], e = [], n = 0; n < t.data.length; n++) {
            var i = t.data[n], s = {}, o = {
                id: i.id,
                latitude: i.lat,
                longitude: i.lon,
                title: i.title,
                iconPath: "/wdl_weihouse/static/images/point2.png",
                width: 30,
                height: 30
            };
            s.latitude = i.lat, s.longitude = i.lon, a.push(o), e.push(s);
        }
        this.setData({
            markers: a,
            points: e,
            index: 1
        });
    },
    getHouseInfo: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/newshop",
            cachetime: "0",
            data: {
                id: t
            },
            success: function(t) {
                a.setData({
                    item: t.data.data.house
                });
            }
        });
    },
    onLoad: function(t) {
        app.kbtools.isnull(t.tags) || this.setData({
            tags: t.tags
        }), this.sechouse_points();
    },
    regionchange: function(t) {},
    onMarkerclick: function(t) {
        console.log("marker 点击", t);
        for (var a = t.markerId, e = this.data.markers, n = 0, i = 0; i < e.length; i++) e[i].width = 30, 
        e[i].height = 30, e[i].id == a && (e[i].width = 40, e[i].height = 40, n = i);
        this.setData({
            markers: e,
            index: n
        }), this.getHouseInfo(a);
    },
    controltap: function(t) {
        console.log(t.controlId);
    },
    maptap: function(t) {},
    onReady: function() {
        var a = this;
        a.citypoint(), wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    mapstyle: "width:" + t.windowWidth + "px; height:" + (t.windowHeight - 150) + "px;"
                });
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});