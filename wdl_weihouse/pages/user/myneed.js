var app = getApp();

Page({
    data: {
        tempFilePaths: [],
        form_image_paths: [],
        transfile: {},
        isupend: !0,
        show_progress: !1,
        progress_per: 0,
        islogin: !1,
        prive: {},
        id: 0,
        rent_type: 0,
        zhutype: 4,
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
        search_price: [],
        price_index: 0,
        search_sufix: [],
        sufix_index: 0,
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
                0: "二手出售",
                1: "写字楼出售",
                2: "商铺出售",
                3: "生意转让"
            },
            2: {
                0: "女士征婚",
                1: "写字楼出租",
                2: "商铺出租",
                3: "生意转让"
            }
        }
    },
    formcheckfield: function() {
        return {
            "2-4": {
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
                }
            },
            "0-4": {
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
                }
            }
        }[this.data.rent_type + "-" + this.data.zhutype];
    },
    ismodify: function() {
        var c = this, a = c.data.id;
        c.data.rent_type;
        0 < a ? app.util.request({
            url: "entry/wxapp/update",
            cachetime: "0",
            data: {
                enews: "fetch",
                tablename: 1,
                id: a
            },
            success: function(a) {
                var e = a.data.data, t = 0, i = 0, s = 0, r = 0, n = 0, u = 0, d = 0, o = 0, h = 0, p = c.data.search_areas;
                if (p) for (var l in p) if (e.area == p[l]) {
                    t = l;
                    break;
                }
                if (p = c.data.search_quan[t]) for (var l in p) if (e.quan == p[l]) {
                    u = l;
                    break;
                }
                if (p = c.data.search_housetype) for (var l in p) if (e.house_type == p[l]) {
                    i = l;
                    break;
                }
                if (p = c.data.search_zhaungxiu) for (var l in p) if (e.traveaux_finition == p[l]) {
                    s = l;
                    break;
                }
                if (p = c.data.search_chaoxiang) for (var l in p) if (e.donner_sur == p[l]) {
                    r = l;
                    break;
                }
                if (p = c.data.search_years) for (var l in p) if (e.build_age == p[l]) {
                    n = l;
                    break;
                }
                if (p = c.data.search_sptype) for (var l in p) if (e.house_type == p[l]) {
                    h = l;
                    break;
                }
                if (p = c.data.search_price) for (var l in p) if (e.price == p[l]) {
                    o = l;
                    break;
                }
                if (p = c.data.search_sufix) for (var l in p) if (e.sufix == p[l]) {
                    d = l;
                    break;
                }
                c.setData({
                    info: e,
                    areas_index: t,
                    quan_index: u,
                    housetype_index: i,
                    zhuang_index: s,
                    chaoxiang_index: r,
                    years_index: n,
                    sptype_index: h,
                    hangye_index: 0,
                    jingyin_index: 0,
                    price_index: o,
                    sufix_index: d,
                    tempFilePaths: e.attachs_url ? e.attachs_url : [],
                    form_image_paths: e.attachs ? e.attachs : [],
                    rent_type: e.rent_type,
                    zhutype: e.zhutype,
                    prix_unitaire_value: e.prix_unitaire,
                    showdialog: !1
                });
            }
        }) : c.data.showdialog && c.trigger_dialog();
    },
    userprive: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/userprive",
            cachetime: "0",
            data: {},
            success: function(a) {
                console.log(a), e.setData({
                    prive: a.data.data
                }), e.search_params();
            }
        });
    },
    checkisbroker: function() {
        app.util.request({
            url: "entry/wxapp/Brokercheck",
            cachetime: "0",
            showLoading: !1,
            data: {},
            success: function(a) {
                if (a.data.data) return !0;
                wx.redirectTo({
                    url: "../user/bind"
                });
            }
        });
    },
    trigger_dialog: function(a) {
        console.log(a);
        var e = this.data.hiddendialog;
        this.setData({
            hiddendialog: !e,
            positon: "top:200rpx",
            dialog: {
                title: "请选择想要查找的商业类型",
                items: [ {
                    name: "发男士征婚",
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
    onLoad: function(a) {
        app.checkAuthorLogin(this, "/wdl_weihouse/pages/user/publish"), this.checkisbroker();
        var e = 0, t = 0, i = 4, s = !1;
        app.kbtools.isnull(a.rent) || (e = a.rent), app.kbtools.isnull(a.id) || (t = a.id), 
        app.kbtools.isnull(a.zhutype) || (i = a.zhutype);
        var r = "万";
        0 == e && 0 == i ? r = "万" : 2 == e && 0 == i ? r = "元/月" : 0 == e && 1 == i ? r = "万" : 2 == e && 1 == i ? r = "元/月" : 0 == e && 2 == i ? r = "万" : 2 == e && 2 == i ? r = "元/月" : 0 == e && 4 == i ? r = "万" : 2 == e && 4 == i ? r = "元/月" : 0 == e && 3 == i && (r = "万"), 
        null == a.zhutype && null == a.rent && (s = !0), this.setData({
            id: parseInt(t),
            rent_type: parseInt(e),
            zhutype: parseInt(i),
            showdialog: s,
            prix_unitaire_value: r
        }), this.userprive();
    },
    onReady: function() {},
    bindKeyInput: function(a) {
        a.target.dataset.name;
    },
    sdropshow: function(a) {
        var e = this.data.sdropshow;
        this.setData({
            sdropshow: !e
        });
    },
    sdropitem: function(a) {
        this.setData({
            prix_unitaire_value: a.currentTarget.dataset.title,
            prix_unitaire_label: a.currentTarget.dataset.title
        });
    },
    bindPicker_areas: function(a) {
        var e = this.data.area;
        e.value = this.data.search_areas[a.detail.value], this.setData({
            areas_index: a.detail.value,
            area: e
        });
    },
    bindPicker_quan: function(a) {
        var e = this.data.quan, t = this.data.areas_index;
        e.value = this.data.search_quan[t][a.detail.value], this.setData({
            quan_index: a.detail.value,
            quan: e
        });
    },
    bindPicker_housetype: function(a) {
        var e = this.data.housetype;
        e.value = this.data.search_housetype[a.detail.value], e.istrue = !0, this.setData({
            housetype_index: a.detail.value,
            housetype: e
        });
    },
    bindPicker_zhuangxiu: function(a) {
        var e = this.data.traveaux_finition;
        e.value = this.data.search_zhaungxiu[a.detail.value], e.istrue = !0, this.setData({
            zhuang_index: a.detail.value,
            traveaux_finition: e
        });
    },
    bindPicker_chaoxiang: function(a) {
        var e = this.data.donner_sur;
        e.value = this.data.search_chaoxiang[a.detail.value], e.istrue = !0, this.setData({
            chaoxiang_index: a.detail.value,
            donner_sur: e
        });
    },
    bindPicker_years: function(a) {
        var e = this.data.build_age;
        e.value = this.data.search_years[a.detail.value], e.istrue = !0, this.setData({
            years_index: a.detail.value,
            build_age: e
        });
    },
    bindPicker_sptype: function(a) {
        var e = this.data.sptype;
        e.value = this.data.search_sptype[a.detail.value], e.istrue = !0, this.setData({
            sptype_index: a.detail.value,
            sptype: e
        });
    },
    bindPicker_hangye: function(a) {
        var e = this.data.hangye;
        e.value = this.data.search_hangye[a.detail.value], this.setData({
            hangye_index: a.detail.value,
            hangye: e
        });
    },
    bindPicker_jingyin: function(a) {
        var e = this.data.jingyin, t = this.data.hangye_index;
        e.value = this.data.search_jingyin[t][a.detail.value], this.setData({
            jingyin_index: a.detail.value,
            jingyin: e
        });
    },
    bindPicker_price: function(a) {
        var e = this.data.price;
        e.value = this.data.search_price[a.detail.value], this.setData({
            price_index: a.detail.value,
            price: e
        });
    },
    bindPicker_sufix: function(a) {
        var e = this.data.sufix;
        e.value = this.data.search_sufix[a.detail.value], this.setData({
            sufix_index: a.detail.value,
            sufix: e
        });
    },
    search_params: function() {
        var v = this;
        app.kbtools.get_settingdata(v, function(a) {
            v.setData({
                settingdata: a.data.settingdata
            });
        }), app.util.request({
            url: "entry/wxapp/searchkey",
            data: {
                type: v.data.rent_type
            },
            cache: 60,
            success: function(a) {
                console.log(a);
                var e, t = a.data.data.areas, i = [], s = [], r = [], n = [], u = [], d = [], o = [], h = [], p = [], l = [];
                if (t) {
                    var c = a.data.data.quan;
                    for (var _ in t) i.push(t[_]), app.kbtools.isnull(c) || u.push(c[t[_]]);
                }
                if (t = a.data.data.housetype) for (var _ in t) s.push(t[_]);
                if (t = a.data.data.zhaungxiu) for (var _ in t) r.push(t[_]);
                if (t = a.data.data.chaoxiang) for (var _ in t) n.push(t[_]);
                if (t = a.data.data.sptype) for (var _ in t) d.push(t[_]);
                if (t = a.data.data.hangye) for (var _ in t) o.push(t[_]);
                if (t = a.data.data.jingyin) for (var _ in t) h.push(t[_]);
                if (e = a.data.data.years, t = a.data.data.price) for (var _ in t) p.push(_);
                if (t = a.data.data.sufix) for (var _ in t) l.push(_);
                v.setData({
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
                    search_years: e,
                    build_age: {
                        value: e[0],
                        txt: "建筑年代"
                    },
                    search_sptype: d,
                    sptype: {
                        value: d[0],
                        txt: "商铺类型"
                    },
                    search_hangye: o,
                    search_jingyin: h,
                    hangye: {
                        value: o[0],
                        txt: "行业分类"
                    },
                    jingyin: {
                        value: h[0],
                        txt: "经营种类"
                    },
                    search_price: p,
                    search_sufix: l,
                    price: {
                        value: p[0],
                        txt: "意向价格"
                    },
                    sufix: {
                        value: l[0],
                        txt: "身高"
                    }
                }), app.kbtools.isnull(v.data.prive.prive.broker) || v.setData({
                    info: {
                        linkphone: v.data.prive.prive.broker.mobile,
                        publish_name: v.data.prive.prive.broker.nickname
                    }
                }), v.ismodify();
            }
        });
    },
    formSubmit: function(a) {
        var e = this, t = a.detail.value, i = e.data.prive;
        if (1 == i.needpay && 0 == i.credit_send_ok) return wx.showToast({
            title: "当前积分不足，无法发布\n请先充值！",
            icon: "none",
            duration: 2e3
        }), !1;
        var s = {
            detail: {
                value: e.data.years_index
            }
        };
        e.bindPicker_years(s);
        s = {
            detail: {
                value: e.data.areas_index
            }
        };
        e.bindPicker_areas(s);
        s = {
            detail: {
                value: e.data.quan_index
            }
        };
        e.bindPicker_quan(s);
        s = {
            detail: {
                value: e.data.housetype_index
            }
        };
        e.bindPicker_housetype(s);
        s = {
            detail: {
                value: e.data.zhuang_index
            }
        };
        e.bindPicker_zhuangxiu(s);
        s = {
            detail: {
                value: e.data.chaoxiang_index
            }
        };
        e.bindPicker_chaoxiang(s);
        s = {
            detail: {
                value: e.data.sptype_index
            }
        };
        e.bindPicker_sptype(s);
        s = {
            detail: {
                value: e.data.hangye_index
            }
        };
        e.bindPicker_hangye(s);
        s = {
            detail: {
                value: e.data.jingyin_index
            }
        };
        e.bindPicker_jingyin(s);
        s = {
            detail: {
                value: e.data.price_index
            }
        };
        e.bindPicker_price(s);
        s = {
            detail: {
                value: e.data.sufix_index
            }
        };
        e.bindPicker_sufix(s), app.kbtools.isnull(e.data.prix_unitaire_value) || (t.prix_unitaire = e.data.prix_unitaire_value);
        var r = {
            area: e.data.area.value,
            quan: e.data.quan.value,
            house_type: e.data.housetype.value,
            build_age: e.data.build_age.value,
            traveaux_finition: e.data.traveaux_finition.value,
            donner_sur: e.data.donner_sur.value,
            id: e.data.id,
            rent_type: e.data.rent_type,
            zhutype: e.data.zhutype,
            thumbs: e.data.form_image_paths,
            needpay: i.needpay,
            need_credit: i.need_pay_credit
        };
        t = app.kbtools.extend(t, r), 2 == e.data.zhutype && (t.house_type = e.data.sptype.value), 
        3 == e.data.zhutype && (t.house_type = e.data.sptype.value, t.disposition = e.data.hangye.value + "," + e.data.jingyin.value), 
        4 == e.data.zhutype && (t.disposition = e.data.sufix.value + "," + e.data.price.value), 
        console.log(t);
        var n = e.formcheckfield(), u = !0;
        if (!app.kbtools.isnull(n)) for (var d in n) {
            var o = n[d];
            if (app.kbtools.isnull(t[d])) {
                wx.showToast({
                    title: "请输入" + o.txt,
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
            success: function(a) {
                wx.showToast({
                    title: "返回" + a.data.message,
                    icon: "success",
                    duration: 2e3,
                    success: function() {
                        wx.getStorage({
                            key: "publish_return",
                            success: function(a) {
                                wx.redirectTo({
                                    url: a.data
                                });
                            },
                            fail: function() {
                                wx.redirectTo({
                                    url: "../broker/mysend"
                                });
                            }
                        });
                    }
                });
            },
            fail: function(a) {
                a.data.message && app.util.message(a.data.message, "", "error");
            }
        });
    },
    removepic: function(a) {
        var e = a.currentTarget.dataset.index, t = this.data.tempFilePaths, i = this.data.form_image_paths;
        t.splice(e, 1), i.splice(e, 1), this.setData({
            tempFilePaths: t,
            form_image_paths: i
        });
    },
    uploadImages: function() {
        var i = this, s = i.data.tempFilePaths;
        wx.chooseImage({
            count: 9,
            success: function(a) {
                var e = a.tempFilePaths;
                s = s.concat(e), i.setData({
                    tempFilePaths: s,
                    isupend: !1
                });
                var t = {};
                t.path = e, i.uploadimg(t);
            }
        });
    },
    uploadimg: function(a) {
        var i = this, e = a.i ? a.i : 0, s = a.success ? a.success : 0, t = a.fail ? a.fail : 0;
        i.setData({
            show_progress: !0,
            progress_per: 0
        });
        var r = app.util.url("entry/wxapp/transfile", {
            m: "wdl_weihouse"
        });
        wx.uploadFile({
            url: r,
            filePath: a.path[e],
            name: "upfile",
            formData: {},
            success: function(a) {
                s++, i.setData({
                    show_progress: !1
                });
                var e = a.data.split("#"), t = i.data.form_image_paths;
                i.setData({
                    form_image_paths: t.concat(e[0])
                });
            },
            fail: function(a) {
                t++, console.log("fail:" + e + "fail:" + t);
            },
            complete: function() {
                ++e == a.path.length ? (console.log("执行完毕"), i.setData({
                    isupend: !0
                }), console.log("成功：" + s + " 失败：" + t)) : (a.i = e, a.success = s, a.fail = t, 
                i.uploadimg(a));
            }
        });
    }
});