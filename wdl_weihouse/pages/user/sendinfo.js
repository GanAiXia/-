var app = getApp();

Page({
    data: {
        tempFilePaths: [],
        form_image_paths: [],
        form_video_paths: "",
        transfile: {},
        isupend: !0,
        show_progress: !1,
        progress_per: 0,
        islogin: !1,
        prive: {},
        id: 0,
        rent_type: 0,
        zhutype: 0,
        settingdata: {},
        sdropshow: !0,
        prix_unitaire_value: "",
        prix_unitaire_label: "元/月",
        info: {},
        area: {
            value: "",
            txt: "所在区域",
            istrue: !1,
            ischeck: !0
        },
        quan: {
            value: "",
            txt: "商圈",
            istrue: !1,
            ischeck: !1
        },
        housetype: {
            value: "",
            txt: "类型",
            istrue: !1,
            ischeck: !1
        },
        sptype: {
            value: "",
            txt: "类型",
            istrue: !1,
            ischeck: !1
        },
        traveaux_finition: {
            value: "",
            txt: "装修情况",
            istrue: !1,
            ischeck: !1
        },
        donner_sur: {
            value: "",
            txt: "朝向",
            istrue: !1,
            ischeck: !1
        },
        build_age: {
            value: "",
            txt: "建筑年代",
            istrue: !1,
            ischeck: !1
        },
        hagnye: {
            value: "",
            txt: "行业分类",
            istrue: !1,
            ischeck: !1
        },
        jingyin: {
            value: "",
            txt: "经营种类",
            istrue: !1,
            ischeck: !1
        },
        search_areas: [],
        areas_index: 0,
        search_quan: [],
        quan_index: 0,
        search_price: {},
        search_sufix: {},
        search_room: {},
        search_chaoxiang: [],
        chaoxiang_index: 0,
        search_housetype: [],
        housetype_index: 0,
        search_zhaungxiu: [],
        zhuang_index: 0,
        search_years: [],
        years_index: 0,
        search_sptype: [],
        sptype_index: 0,
        search_hangye: [],
        hangye_index: 0,
        search_jingyin: [],
        jingyin_index: 0,
        hiddendialog: !0,
        positon: "",
        infotype: {
            0: {
                0: "房屋出售",
                1: "写字楼出售",
                2: "商铺出售",
                3: "生意转让"
            },
            2: {
                0: "房屋出租",
                1: "写字楼出租",
                2: "商铺出租",
                3: "生意转让"
            }
        }
    },
    formcheckfield: function() {
        return {
            "0-0": {
                title: {
                    value: "",
                    txt: "信息标题",
                    istrue: !1,
                    ischeck: !0
                },
                area: {
                    value: "",
                    txt: "所在区域",
                    istrue: !1,
                    ischeck: !0
                },
                village_name: {
                    value: "",
                    txt: "小区名称",
                    istrue: !1,
                    ischeck: !0
                },
                room: {
                    value: "",
                    txt: "房",
                    istrue: !1,
                    ischeck: !0
                },
                superficie: {
                    value: "",
                    txt: "建身高",
                    istrue: !1,
                    ischeck: !0
                },
                loyer: {
                    value: "",
                    txt: "期望售价",
                    istrue: !1,
                    ischeck: !0
                }
            },
            "2-0": {
                title: {
                    value: "",
                    txt: "信息标题",
                    istrue: !1,
                    ischeck: !0
                },
                area: {
                    value: "",
                    txt: "所在区域",
                    istrue: !1,
                    ischeck: !0
                },
                village_name: {
                    value: "",
                    txt: "小区名称",
                    istrue: !1,
                    ischeck: !0
                },
                room: {
                    value: "",
                    txt: "房",
                    istrue: !1,
                    ischeck: !0
                },
                superficie: {
                    value: "",
                    txt: "建身高",
                    istrue: !1,
                    ischeck: !0
                },
                loyer: {
                    value: "",
                    txt: "年薪",
                    istrue: !1,
                    ischeck: !0
                }
            },
            "0-1": {
                title: {
                    value: "",
                    txt: "信息标题",
                    istrue: !1,
                    ischeck: !0
                },
                area: {
                    value: "",
                    txt: "所在区域",
                    istrue: !1,
                    ischeck: !0
                },
                village_name: {
                    value: "",
                    txt: "写字楼名称",
                    istrue: !1,
                    ischeck: !0
                },
                superficie: {
                    value: "",
                    txt: "身高",
                    istrue: !1,
                    ischeck: !0
                },
                loyer: {
                    value: "",
                    txt: "期望售价",
                    istrue: !1,
                    ischeck: !0
                }
            },
            "2-1": {
                title: {
                    value: "",
                    txt: "信息标题",
                    istrue: !1,
                    ischeck: !0
                },
                area: {
                    value: "",
                    txt: "所在区域",
                    istrue: !1,
                    ischeck: !0
                },
                village_name: {
                    value: "",
                    txt: "写字楼名称",
                    istrue: !1,
                    ischeck: !0
                },
                superficie: {
                    value: "",
                    txt: "身高",
                    istrue: !1,
                    ischeck: !0
                },
                loyer: {
                    value: "",
                    txt: "年薪",
                    istrue: !1,
                    ischeck: !0
                }
            },
            "0-2": {
                title: {
                    value: "",
                    txt: "信息标题",
                    istrue: !1,
                    ischeck: !0
                },
                area: {
                    value: "",
                    txt: "所在区域",
                    istrue: !1,
                    ischeck: !0
                },
                village_name: {
                    value: "",
                    txt: "地址",
                    istrue: !1,
                    ischeck: !0
                },
                superficie: {
                    value: "",
                    txt: "身高",
                    istrue: !1,
                    ischeck: !0
                },
                loyer: {
                    value: "",
                    txt: "期望售价",
                    istrue: !1,
                    ischeck: !0
                }
            },
            "2-2": {
                title: {
                    value: "",
                    txt: "信息标题",
                    istrue: !1,
                    ischeck: !0
                },
                area: {
                    value: "",
                    txt: "所在区域",
                    istrue: !1,
                    ischeck: !0
                },
                village_name: {
                    value: "",
                    txt: "地址",
                    istrue: !1,
                    ischeck: !0
                },
                superficie: {
                    value: "",
                    txt: "身高",
                    istrue: !1,
                    ischeck: !0
                },
                loyer: {
                    value: "",
                    txt: "年薪",
                    istrue: !1,
                    ischeck: !0
                }
            },
            "0-3": {
                title: {
                    value: "",
                    txt: "信息标题",
                    istrue: !1,
                    ischeck: !0
                },
                area: {
                    value: "",
                    txt: "所在区域",
                    istrue: !1,
                    ischeck: !0
                },
                village_name: {
                    value: "",
                    txt: "地址",
                    istrue: !1,
                    ischeck: !0
                },
                superficie: {
                    value: "",
                    txt: "身高",
                    istrue: !1,
                    ischeck: !0
                },
                loyer: {
                    value: "",
                    txt: "年薪",
                    istrue: !1,
                    ischeck: !0
                }
            }
        }[this.data.rent_type + "-" + this.data.zhutype];
    },
    ismodify: function() {
        var p = this, e = p.data.id;
        p.data.rent_type;
        0 < e ? app.util.request({
            url: "entry/wxapp/update",
            cachetime: "0",
            data: {
                enews: "fetch",
                tablename: 1,
                id: e
            },
            success: function(e) {
                var a = e.data.data, t = 0, i = 0, s = 0, r = 0, n = 0, u = 0, o = 0, l = 0, c = 0, d = p.data.search_areas;
                if (d) for (var h in d) if (a.area == d[h]) {
                    t = h;
                    break;
                }
                if (d = p.data.search_quan[t]) for (var h in d) if (a.quan == d[h]) {
                    u = h;
                    break;
                }
                if (d = p.data.search_housetype) for (var h in d) if (a.house_type == d[h]) {
                    i = h;
                    break;
                }
                if (d = p.data.search_zhaungxiu) for (var h in d) if (a.traveaux_finition == d[h]) {
                    s = h;
                    break;
                }
                if (d = p.data.search_chaoxiang) for (var h in d) if (a.donner_sur == d[h]) {
                    r = h;
                    break;
                }
                if (d = p.data.search_years) for (var h in d) if (a.build_age == d[h]) {
                    n = h;
                    break;
                }
                if (d = p.data.search_sptype) for (var h in d) if (a.house_type == d[h]) {
                    o = h;
                    break;
                }
                if (d = p.data.search_hangye) for (var h in d) if (a.hangye == d[h]) {
                    l = h;
                    break;
                }
                if (d = p.data.search_jingyin[l]) for (var h in d) if (a.jingyin == d[h]) {
                    c = h;
                    break;
                }
                p.setData({
                    info: a,
                    areas_index: t,
                    quan_index: u,
                    housetype_index: i,
                    zhuang_index: s,
                    chaoxiang_index: r,
                    years_index: n,
                    sptype_index: o,
                    hangye_index: l,
                    jingyin_index: c,
                    tempFilePaths: a.attachs_url ? a.attachs_url : [],
                    form_image_paths: a.attachs ? a.attachs : [],
                    form_video_paths: a.video ? a.video : "",
                    video_src: a.video_src ? a.video_src : "",
                    latlon: a.mapinfo ? a.mapinfo : "",
                    latlon_label: a.mapinfo ? "已经标注，点击可重新标注" : "",
                    rent_type: a.rent_type,
                    zhutype: a.zhutype,
                    prix_unitaire_value: a.prix_unitaire,
                    showdialog: !1
                });
            }
        }) : p.data.showdialog && p.trigger_dialog();
    },
    userprive: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/userprive",
            cachetime: "0",
            data: {},
            success: function(e) {
                console.log(e), a.setData({
                    prive: e.data.data
                }), a.search_params();
            }
        });
    },
    checkisbroker: function() {
        app.util.request({
            url: "entry/wxapp/Brokercheck",
            cachetime: "0",
            showLoading: !1,
            data: {},
            success: function(e) {
                if (e.data.data) return !0;
                wx.redirectTo({
                    url: "../user/bind"
                });
            }
        });
    },
    trigger_dialog: function(e) {
        console.log(e);
        var a = this.data.hiddendialog;
        this.setData({
            hiddendialog: !a,
            positon: "top:200rpx",
            dialog: {
                title: "请选择想要查找的商业类型",
                items: [ {
                    name: "房屋出售",
                    url: "../user/sendinfo?rent=0&zhutype=0",
                    opentype: "redirect"
                }, {
                    name: "发出女士征婚",
                    url: "../user/sendinfo?rent=2&zhutype=0",
                    opentype: "redirect"
                }, {
                    name: "写字楼出租",
                    url: "../user/sendinfo?rent=2&zhutype=1",
                    opentype: "redirect"
                }, {
                    name: "写字楼出售",
                    url: "../user/sendinfo?rent=0&zhutype=1",
                    opentype: "redirect"
                }, {
                    name: "商铺出租",
                    url: "../user/sendinfo?rent=2&zhutype=2",
                    opentype: "redirect"
                }, {
                    name: "商铺出售",
                    url: "../user/sendinfo?rent=0&zhutype=2",
                    opentype: "redirect"
                }, {
                    name: "生意转让",
                    url: "../user/sendinfo?rent=0&zhutype=3",
                    opentype: "redirect"
                } ]
            }
        });
    },
    onLoad: function(e) {
        app.checkAuthorLogin(this, "/wdl_weihouse/pages/user/publish"), this.checkisbroker();
        var a = 0, t = 0, i = 0, s = !1;
        app.kbtools.isnull(e.rent) || (a = e.rent), app.kbtools.isnull(e.id) || (t = e.id), 
        app.kbtools.isnull(e.zhutype) || (i = e.zhutype);
        var r = "万";
        0 == a && 0 == i ? r = "万" : 2 == a && 0 == i ? r = "元/月" : 0 == a && 1 == i ? r = "万" : 2 == a && 1 == i ? r = "元/月" : 0 == a && 2 == i ? r = "万" : 2 == a && 2 == i ? r = "元/月" : 0 == a && 3 == i && (r = "万"), 
        null == e.zhutype && null == e.rent && (s = !0), this.setData({
            id: parseInt(t),
            rent_type: parseInt(a),
            zhutype: parseInt(i),
            showdialog: s,
            prix_unitaire_value: r
        }), this.userprive();
    },
    onReady: function() {},
    bindKeyInput: function(e) {
        e.target.dataset.name;
    },
    sdropshow: function(e) {
        var a = this.data.sdropshow;
        this.setData({
            sdropshow: !a
        });
    },
    sdropitem: function(e) {
        this.setData({
            prix_unitaire_value: e.currentTarget.dataset.title,
            prix_unitaire_label: e.currentTarget.dataset.title
        });
    },
    bindPicker_areas: function(e) {
        var a = this.data.area;
        a.value = this.data.search_areas[e.detail.value], this.setData({
            areas_index: e.detail.value,
            area: a
        });
    },
    bindPicker_quan: function(e) {
        var a = this.data.quan, t = this.data.areas_index;
        a.value = this.data.search_quan[t][e.detail.value], this.setData({
            quan_index: e.detail.value,
            quan: a
        });
    },
    bindPicker_housetype: function(e) {
        var a = this.data.housetype;
        a.value = this.data.search_housetype[e.detail.value], a.istrue = !0, this.setData({
            housetype_index: e.detail.value,
            housetype: a
        });
    },
    bindPicker_zhuangxiu: function(e) {
        var a = this.data.traveaux_finition;
        a.value = this.data.search_zhaungxiu[e.detail.value], a.istrue = !0, this.setData({
            zhuang_index: e.detail.value,
            traveaux_finition: a
        });
    },
    bindPicker_chaoxiang: function(e) {
        var a = this.data.donner_sur;
        a.value = this.data.search_chaoxiang[e.detail.value], a.istrue = !0, this.setData({
            chaoxiang_index: e.detail.value,
            donner_sur: a
        });
    },
    bindPicker_years: function(e) {
        var a = this.data.build_age;
        a.value = this.data.search_years[e.detail.value], a.istrue = !0, this.setData({
            years_index: e.detail.value,
            build_age: a
        });
    },
    bindPicker_sptype: function(e) {
        var a = this.data.sptype;
        a.value = this.data.search_sptype[e.detail.value], a.istrue = !0, this.setData({
            sptype_index: e.detail.value,
            sptype: a
        });
    },
    bindPicker_hangye: function(e) {
        var a = this.data.hangye;
        a.value = this.data.search_hangye[e.detail.value], this.setData({
            hangye_index: e.detail.value,
            hangye: a
        });
    },
    bindPicker_jingyin: function(e) {
        var a = this.data.jingyin, t = this.data.hangye_index;
        a.value = this.data.search_jingyin[t][e.detail.value], this.setData({
            jingyin_index: e.detail.value,
            jingyin: a
        });
    },
    search_params: function() {
        var p = this;
        app.kbtools.get_settingdata(p, function(e) {
            p.setData({
                settingdata: e.data.settingdata
            });
        }), app.util.request({
            url: "entry/wxapp/searchkey",
            data: {
                type: 0
            },
            cache: 60,
            success: function(e) {
                console.log(e);
                var a, t = e.data.data.areas, i = [], s = [], r = [], n = [], u = [], o = [], l = [], c = [];
                if (t) {
                    var d = e.data.data.quan;
                    for (var h in t) i.push(t[h]), app.kbtools.isnull(d) || u.push(d[t[h]]);
                }
                if (t = e.data.data.housetype) for (var h in t) s.push(t[h]);
                if (t = e.data.data.zhaungxiu) for (var h in t) r.push(t[h]);
                if (t = e.data.data.chaoxiang) for (var h in t) n.push(t[h]);
                if (t = e.data.data.sptype) for (var h in t) o.push(t[h]);
                if (t = e.data.data.hangye) for (var h in t) l.push(t[h]);
                if (t = e.data.data.jingyin) for (var h in t) c.push(t[h]);
                a = e.data.data.years, p.setData({
                    search_areas: i,
                    search_quan: u,
                    area: {
                        value: i[0],
                        txt: "所在区域"
                    },
                    search_housetype: s,
                    housetype: {
                        value: s[0],
                        txt: "类型"
                    },
                    search_zhaungxiu: r,
                    traveaux_finition: {
                        value: r[0],
                        txt: "装修"
                    },
                    search_chaoxiang: n,
                    donner_sur: {
                        value: n[0],
                        txt: "朝向"
                    },
                    search_years: a,
                    build_age: {
                        value: a[0],
                        txt: "建筑年代"
                    },
                    search_sptype: o,
                    sptype: {
                        value: o[0],
                        txt: "商铺类型"
                    },
                    search_hangye: l,
                    search_jingyin: c,
                    hangye: {
                        value: l[0],
                        txt: "行业分类"
                    },
                    jingyin: {
                        value: c[0],
                        txt: "经营种类"
                    }
                }), app.kbtools.isnull(p.data.prive.prive.broker) || p.setData({
                    info: {
                        linkphone: p.data.prive.prive.broker.mobile,
                        publish_name: p.data.prive.prive.broker.nickname
                    }
                }), p.ismodify();
            }
        });
    },
    formSubmit: function(e) {
        var a = this, t = e.detail.value;
        if (!app.kbtools.isnull(a.show_video_progress)) return wx.showToast({
            title: "视频正在上传"
        }), !1;
        var i = a.data.prive;
        if (1 == i.needpay && 0 == i.credit_send_ok) return wx.showToast({
            title: "当前积分不足，无法发布\n请先充值！",
            icon: "none",
            duration: 2e3
        }), !1;
        var s = {
            detail: {
                value: a.data.years_index
            }
        };
        a.bindPicker_years(s);
        s = {
            detail: {
                value: a.data.areas_index
            }
        };
        a.bindPicker_areas(s);
        s = {
            detail: {
                value: a.data.quan_index
            }
        };
        a.bindPicker_quan(s);
        s = {
            detail: {
                value: a.data.housetype_index
            }
        };
        a.bindPicker_housetype(s);
        s = {
            detail: {
                value: a.data.zhuang_index
            }
        };
        a.bindPicker_zhuangxiu(s);
        s = {
            detail: {
                value: a.data.chaoxiang_index
            }
        };
        a.bindPicker_chaoxiang(s);
        s = {
            detail: {
                value: a.data.sptype_index
            }
        };
        a.bindPicker_sptype(s);
        s = {
            detail: {
                value: a.data.hangye_index
            }
        };
        a.bindPicker_hangye(s);
        s = {
            detail: {
                value: a.data.jingyin_index
            }
        };
        a.bindPicker_jingyin(s), app.kbtools.isnull(a.data.prix_unitaire_value) || (t.prix_unitaire = a.data.prix_unitaire_value);
        var r = {
            area: a.data.area.value,
            quan: a.data.quan.value,
            house_type: a.data.housetype.value,
            build_age: a.data.build_age.value,
            traveaux_finition: a.data.traveaux_finition.value,
            donner_sur: a.data.donner_sur.value,
            id: a.data.id,
            rent_type: a.data.rent_type,
            zhutype: a.data.zhutype,
            thumbs: a.data.form_image_paths,
            video: a.data.form_video_paths,
            needpay: i.needpay,
            need_credit: i.need_pay_credit
        };
        if (t = app.kbtools.extend(t, r), 2 == a.data.zhutype && (t.house_type = a.data.sptype.value), 
        3 == a.data.zhutype && (t.house_type = a.data.sptype.value, t.disposition = a.data.hangye.value + "," + a.data.jingyin.value), 
        console.log(t), 0 == t.thumbs.length) return wx.showToast({
            title: "请上传图片",
            icon: "none",
            duration: 2e3
        }), !1;
        var n = a.formcheckfield(), u = !0;
        if (!app.kbtools.isnull(n)) for (var o in n) {
            var l = n[o];
            if (app.kbtools.isnull(t[o])) {
                wx.showToast({
                    title: "请输入" + l.txt,
                    icon: "none",
                    duration: 2e3
                }), u = !1;
                break;
            }
        }
        if (!u) return !1;
        app.util.request({
            url: "entry/wxapp/postsechouse",
            data: t,
            method: "post",
            success: function(e) {
                wx.showToast({
                    title: "返回" + e.data.message,
                    icon: "success",
                    duration: 2e3,
                    success: function() {
                        wx.getStorage({
                            key: "publish_return",
                            success: function(e) {
                                wx.redirectTo({
                                    url: e.data
                                });
                            },
                            fail: function() {
                                wx.redirectTo({
                                    url: "../broker/manage"
                                });
                            }
                        });
                    }
                });
            },
            fail: function(e) {
                e.data.message && app.util.message(e.data.message, "", "error");
            }
        });
    },
    removepic: function(e) {
        var a = e.currentTarget.dataset.index, t = this.data.tempFilePaths, i = this.data.form_image_paths;
        t.splice(a, 1), i.splice(a, 1), this.setData({
            tempFilePaths: t,
            form_image_paths: i
        });
    },
    uploadImages: function() {
        var i = this, s = i.data.tempFilePaths;
        wx.chooseImage({
            count: 9,
            success: function(e) {
                var a = e.tempFilePaths;
                s = s.concat(a), i.setData({
                    tempFilePaths: s,
                    isupend: !1
                });
                var t = {};
                t.path = a, i.uploadimg(t);
            }
        });
    },
    uploadimg: function(e) {
        var i = this, a = e.i ? e.i : 0, s = e.success ? e.success : 0, t = e.fail ? e.fail : 0;
        i.setData({
            show_progress: !0,
            progress_per: 0
        });
        var r = app.util.url("entry/wxapp/transfile", {
            m: "wdl_weihouse"
        });
        wx.uploadFile({
            url: r,
            filePath: e.path[a],
            name: "upfile",
            formData: {},
            success: function(e) {
                s++, i.setData({
                    show_progress: !1
                });
                var a = e.data.split("#"), t = i.data.form_image_paths;
                i.setData({
                    form_image_paths: t.concat(a[0])
                });
            },
            fail: function(e) {
                t++, console.log("fail:" + a + "fail:" + t);
            },
            complete: function() {
                ++a == e.path.length ? (console.log("执行完毕"), i.setData({
                    isupend: !0
                }), console.log("成功：" + s + " 失败：" + t)) : (e.i = a, e.success = s, e.fail = t, 
                i.uploadimg(e));
            }
        });
    },
    bindButtonTapVideo: function(e) {
        var a = this;
        wx.chooseVideo({
            sourceType: [ "album", "camera" ],
            maxDuration: 10,
            camera: "back",
            success: function(e) {
                a.setData({
                    video_src: e.tempFilePath
                }), a.uploadVideo(e.tempFilePath);
            }
        });
    },
    uploadVideo: function(e) {
        var t = this, a = app.util.url("entry/wxapp/TransVideo", {
            m: "wdl_weihouse"
        });
        wx.uploadFile({
            url: a,
            filePath: e,
            name: "upfile",
            formData: {},
            success: function(e) {
                var a = e.data.split("#");
                t.setData({
                    form_video_paths: a[0]
                });
            },
            fail: function(e) {
                console.log("fail: lost!");
            },
            complete: function() {
                console.log("执行完毕 complete");
            }
        }).onProgressUpdate(function(e) {
            e.progress < 100 ? t.setData({
                show_video_progress: 1,
                progress_video_per: e.progress
            }) : t.setData({
                show_video_progress: 0
            }), console.log("上传进度", e.progress), console.log("已经上传的数据长度", e.totalBytesSent), 
            console.log("预期需要上传的数据总长度", e.totalBytesExpectedToSend);
        });
    },
    bindMapInput: function() {
        var t = this;
        wx.chooseLocation({
            success: function(e) {
                var a = e.longitude + "," + e.latitude;
                t.setData({
                    latlon: a,
                    latlon_label: e.address
                });
            },
            fail: function() {
                console.log("fail");
            },
            complete: function() {
                console.log("complete");
            }
        });
    }
});