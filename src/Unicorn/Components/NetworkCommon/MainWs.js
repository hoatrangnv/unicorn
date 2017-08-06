(function () {

    var instance = undefined;
    var networkConfigs = uc.Network.configs.MAIN_WS;
    var messageQueue = [];


    var listener = {
        onFinishConnect: function () {
            instance.isDisconected = false;
            while (messageQueue.length > 0) {
                var emitData = messageQueue.shift();
                instance.send(emitData);
            }
        },
        onDisconnected: function () {
            instance.isDisconected = true;
            messageQueue = [];
        },
        onReceived: function (data) {
            var cmdReceived = new uc.Network.CmdReceivedCommon(data);
            console.log("cmdReceived", cmdReceived);
            uc.adapterManager.emit("cmd", cmdReceived);
        },
        onError: function () {
            instance.isDisconected = true;
        }

    };

    var MainWebsocket = uc.Network.MainWebsocket = uc.Network.WebsocketClient.extend({
        ctor: function () {
            this._super();
        },
        sendMessage : function (outPacket) {
            if(instance.isDisconected){
                messageQueue.push(outPacket);
            }else{
                this.send(outPacket);
            }
        }
    });
    cc.extend(MainWebsocket.prototype, EventEmitter.prototype);

    MainWebsocket.getInstance = function () {
        if (instance && !instance.isDisconected)
            return instance;
        else {
            messageQueue = [];
            instance = new uc.Network.MainWebsocket();
            instance.isDisconected = true;
            instance.connect(networkConfigs.HOST, networkConfigs.PORT, networkConfigs.ISSSL, listener);
            return instance;
        }
    };

}.call(this));
