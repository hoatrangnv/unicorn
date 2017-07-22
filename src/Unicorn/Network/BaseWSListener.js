(function () {
    var root = this;
// Ws client

    var BaseWSListener = uc.Network.BaseWSListener = cc.Class.extend(
        {
            ctor: function () {

            },
            onFinishConnect: function (isSuccess) {
                cc.log("BaseWSListener Finish connect " + isSuccess);
            },
            onDisconnected: function () {
                cc.log("BaseWSListener Finish connect " + isSuccess);
            },
            onReceived: function (cmd, pkg) {
                cc.log("BaseWSListener On Received");
            }
        }
    );
}.call(this));
