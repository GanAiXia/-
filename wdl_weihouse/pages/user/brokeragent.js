var app = getApp();

Page({
    data: {
        tempFilePaths: [],
        form_image_paths: [],
        show_progress: !1,
        progress_per: 0,
        islogin: !1,
        broker: {}
    },
    brokerinfo: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/brokeragent",
            data: {
                enews: "getinfo"
            },
            success: function(a) {
                200 == a.statusCode && t.setData({
                    broker: a.data.data.result,
                    form_image_paths: a.data.data.result.avatar,
                    tempFilePaths: [ a.data.data.result.thumb ]
                });
            }
        });
    },
    uploadImages: function() {
        var s = this;
        s.data.tempFilePaths;
        wx.chooseImage({
            count: 1,
            success: function(a) {
                var t = a.tempFilePaths;
                s.setData({
                    tempFilePaths: [ t[0] ]
                }), s.setData({
                    show_progress: !0,
                    progress_per: 0
                });
                var e = app.util.url("entry/wxapp/transfile", {
                    m: "wdl_weihouse"
                });
                wx.uploadFile({
                    url: e,
                    filePath: t[0],
                    name: "upfile",
                    formData: {},
                    success: function(a) {
                        s.setData({
                            show_progress: !1
                        });
                        var t = a.data.split("#");
                        s.data.form_image_paths;
                        s.setData({
                            form_image_paths: t[0]
                        });
                    },
                    fail: function(a) {
                        console.log("失败返回数据", a);
                    }
                }).onProgressUpdate(function(a) {
                    s.setData({
                        progress_per: a.progress
                    });
                });
            }
        });
    },
    formSubmit: function(a) {
        var t = a.detail.value;
        t.avatar = this.data.form_image_paths;
        var e = [ "nickname", "company", "mobile", "vtags" ], s = !0;
        for (var o in e) {
            if (!t[e[o]]) {
                wx.showToast({
                    title: "请完善资料",
                    icon: "none",
                    duration: 2e3
                }), s = !1;
                break;
            }
        }
        if (!s) return !1;
        t.groupid = 1, app.util.request({
            url: "entry/wxapp/brokeragent",
            data: t,
            method: "post",
            success: function(a) {
                wx.showToast({
                    title: "保存成功！",
                    icon: "success",
                    duration: 2e3,
                    success: function() {
                        wx.redirectTo({
                            url: "/wdl_weihouse/pages/index/user"
                        });
                    }
                });
            },
            fail: function(a) {
                a.data.message && app.util.message(a.data.message, "", "error");
            }
        });
    },
    onLoad: function(a) {
        app.checkAuthorLogin(this), this.brokerinfo();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});