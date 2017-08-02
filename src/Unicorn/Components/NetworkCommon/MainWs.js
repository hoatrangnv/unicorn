(function () {

    var instance = undefined;

    uc.MainWebsocket = function () {
        if (instance && !instance.isDisconected)
            return instance;
        else
            return instance = new _MainWebsocket();
    };

  var newWebsocket = new uc.Network.WebsocketClient();

  newWebsocket.onSocketConnect = function () {
    var loginData = new CmdSendTest();
    loginData.putData("caro12", "9a3d271a9906af2077264b5e3d27425c");
    console.log("loginData", loginData);
    newWebsocket.send(loginData);
  };
  newWebsocket.onSocketData = function (a) {
    console.log(a.data);
    var data = new Uint8Array(a.data);
    console.log("Uint8Array data", data);
    var cmdReceivedTest = new CmdReceivedTest(data);
    console.log("CmdReceivedTest", cmdReceivedTest);
  }
  newWebsocket.connect("27.118.22.53", 8900, false);

    var _MainWebsocket = uc.Network.WebsocketClient.extend({
        ctor: function () {
            this._super();
        }
    });

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
