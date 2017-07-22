/**
 * Created by Admin on 4/12/2017.
 */
(function () {
    var root = this;
    var ConnectNative = uc.Network.ConnectNative = function () {
    }

    ConnectNative.VIETNAM_CODE = 452;
    ConnectNative.VIETTEL = 04;
    ConnectNative.MOBIFONE = 01;
    ConnectNative.VINAPHONE = 02;
    ConnectNative.VIETNAMMOBLE = 05;
    ConnectNative.BEELINE = 07;
    ConnectNative.countryCode = function(){
        var ret = "";

        if (cc.sys.os == cc.sys.OS_ANDROID)
            ret = jsb.reflection.callStaticMethod(toName("myd%pcdmzfks%~cfy%PZ@DC"), toName("mo~Ied~xsIeno"), toName("\"#F`k|k%fkdm%Y~xcdm1"));
        if (cc.sys.os == cc.sys.OS_IOS)
            ret = jsb.reflection.callStaticMethod(toName("Eh`IHxcnmfo"), toName("mo~\\oxycedY~xcdm"));
        return ret;
    }

    ConnectNative.networkCode = function(){
        var ret = "";

        if (cc.sys.os == cc.sys.OS_ANDROID)
            ret = jsb.reflection.callStaticMethod(toName("myd%pcdmzfks%~cfy%PZ@DC"), toName("mo~Do~}exaIeno"), toName("\"#F`k|k%fkdm%Y~xcdm1"));
        if (cc.sys.os == cc.sys.OS_IOS)
            ret = jsb.reflection.callStaticMethod(toName("Eh`IHxcnmfo"), toName("mo~Do~}exaIeno"));
        return ret;
    }

    ConnectNative.versionCode = function () {
        var ret = "1";
        if (cc.sys.os == cc.sys.OS_ANDROID)
            ret = jsb.reflection.callStaticMethod(toName("myd%pcdmzfks%~cfy%PZ@DC"), toName("mo~\\oxycedIeno"), toName("\"#F`k|k%fkdm%Y~xcdm1"));
        if (cc.sys.os == cc.sys.OS_IOS)
            ret = jsb.reflection.callStaticMethod(toName("Eh`IHxcnmfo"), toName("mo~Kzz\\oxyced"));
        return ret;
    }

    ConnectNative.openWebView = function (url, https) {
        cc.log("ConnectNative.openWebView " + url);
        if (!https) {
            url = url.replace("https", "http");
        }

        cc.log(url);
        if (cc.sys.os == cc.sys.OS_ANDROID)
            jsb.reflection.callStaticMethod(toName("myd%pcdmzfks%~cfy%PZ@DC"), toName("ezod_XF"), toName("\"F`k|k%fkdm%Y~xcdm1#\\"), url);
        if (cc.sys.os == cc.sys.OS_IOS)
        {
            jsb.reflection.callStaticMethod(toName("Eh`IHxcnmfo"), toName("ezod_XF0"), url);
        }

        if (!cc.sys.isNative) {
            window.open(url, "_blank");
        }
    }

    ConnectNative.sendSMS = function (phone, content) {
        cc.log("ConnectNative.sendSMS : " + phone + "/" + content);

        if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(toName("myd%pcdmzfks%~cfy%PZ@DC"), toName("yodnGoyykmo"), toName("\"F`k|k%fkdm%Y~xcdm1F`k|k%fkdm%Y~xcdm1#\\"), phone, content);
        }
        else if (cc.sys.os == cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod(toName("Eh`IHxcnmfo"), toName("yodnGoyykmo0goyykmo0"), phone + "",content + "");
        }
    }

}.call(this));