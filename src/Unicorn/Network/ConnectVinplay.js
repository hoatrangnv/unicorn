
(function () {
    var root = this;
    return;
    var CmdSendTest = CmdSendCommon.extend(
        {
            ctor:function()
            {
                this._super();
                this.initData(100);
                this.setControllerId(1);
                this.setCmdId(1);
            },
            putData:function(){
                //pack
                this.packHeader();
                this.putString("1000");
                this.updateSize();
            }
        }
    );
    var USER ="th";
    var PASS = 123;
    var CLIENT;

    testWebsocketConnection = function(username, pass){
        CLIENT = new WebsocketClient();
        CLIENT.connect("192.168.1.2", 8081, false);
    };

    testSendData = function(){
        cc.log("Send test data to server");
        var login = new CmdSendTest();
        login.putData(USER, PASS);
        CLIENT.send(login);
        login.clean();
    }
}.call(this));






// end ws client