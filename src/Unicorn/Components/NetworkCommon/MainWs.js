(function () {

    var instance = undefined;
    var networkConfigs = uc.Network.configs.MAIN_WS;
    var controller = []



    var listener = {
        onFinishConnect: function () {
            console.log("onFinishConnect", arguments);

            var loginData = new CmdSendTest();
            loginData.putData("caro12", "9a3d271a9906af2077264b5e3d27425c");
            console.log("loginData", loginData);
            instance.send(loginData);
        },
        onDisconnected: function () {
            instance.isDisconected = true;
        },
        onReceived: function (data) {
            console.log(data);
            var cmdReceivedTest = new CmdReceivedTest(data);
            console.log("CmdReceivedTest", cmdReceivedTest);
        },
        onError: function () {
            instance.isDisconected = true;
        }

    };

    var MainWebsocket = uc.Network.MainWebsocket = uc.Network.WebsocketClient.extend({
        ctor: function () {
            this._super();
        }
    });
    cc.extend(MainWebsocket.prototype, EventEmitter.prototype);

    uc.Network.MainWebsocket.getInstance = function () {
        if (instance && !instance.isDisconected)
            return instance;
        else {
            instance = new uc.Network.MainWebsocket();
            instance.connect(networkConfigs.HOST, networkConfigs.PORT, networkConfigs.ISSSL, listener);
            return instance;
        }
    }

    return;

}.call(this));


var CmdSendTest = uc.Network.CmdSendCommon.extend(
    {
        ctor: function () {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(1);
        },
        putData: function (username, password) {
            //pack
            this.packHeader();
            this.putString(username);
            this.putString(password);
            this.updateSize();
        }
    }
);

var CmdReceivedTest = uc.Network.CmdReceivedCommon.extend(
    {
        ctor: function (pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function () {
            this.result = this.getError();
            this.userId = this.getLong();
            this.username = this.getString();
            this.gold = this.getDouble();
            this.silver = this.getDouble();
        }

    }
);
