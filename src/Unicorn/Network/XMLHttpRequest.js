(function () {
    var root = this;

    var request = uc.Network.request = function (url, params, isPost, callback, errorcallback, callbackHead) {
        // cc.log(url);
        if (url == null || url == '')
            return;
        var xhr = cc.loader.getXMLHttpRequest();
        if (isPost) {
            xhr.open("POST", url);
        } else {
            xhr.open("GET", url);
        }
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            console.log("xhr.readyState",xhr.readyState,xhr.status);
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = xhr.responseText;
                var responseHeader = xhr.getAllResponseHeaders();
                if (callback)
                    callback(response);
                if (callbackHead)
                    callbackHead(responseHeader);
            } else if (xhr.readyState == 4 && xhr.status != 200) {
                var response = xhr.responseText;
                if (errorcallback)
                    errorcallback(response);
            }
        };

        if (params == null || params == "") {
            xhr.send();
        } else {
            xhr.send(params);
        }
        // xhr.open('HEAD', document.location, true);
        //xhr.send(null);
    };
}.call(this));
