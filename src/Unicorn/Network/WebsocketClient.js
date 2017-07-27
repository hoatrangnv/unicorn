(function () {
    var root = this;
// Ws client
    var useTCP = false;

    var WebSocket = WebSocket || window.WebSocket || window.MozWebSocket;

    var EVENT_CONNECT_SUCCESS = 0;
    var EVENT_CONNECT_ERROR = 3;
    var EVENT_DISCONNECT = 1;
    var EVENT_RECEIVED = 2;


    var WebsocketClient = uc.Network.WebsocketClient = cc.Class.extend({
        ctor: function () {
            this.listener = null;
            this.ws = null;
            if (!cc.sys.isNative) {
                cc.director.getScheduler().scheduleUpdate(this, 0, false);
            }
            this.data = [];
            this.event = -1;
        },
        getHandshakeRequest: function () {
            var obj = {};
            obj.c = 0;
            obj.a = 0;
            obj.p = {};
            obj.p["cl"] = "JavaScript";
            obj.p["api"] = "1.2.0";

            return JSON.stringify(obj);
        },
        handleHandshake: function () {
        },
        update: function () {
            this.dispatchEvent();
        },
        //

        dispatchEvent: function (event) {
            if (this.event == EVENT_CONNECT_SUCCESS) {
                if (this.listener && this.listener.onFinishConnect) {
                    this.listener.target = this;
                    this.listener.onFinishConnect.call(this.listener, true);
                }
                this.event = -1;
            }
            else if (this.event == EVENT_CONNECT_ERROR) {
                if (this.listener && this.listener.onFinishConnect) {
                    this.listener.target = this;
                    this.listener.onFinishConnect.call(this.listener, false);
                }
            }
            else if (this.event == EVENT_DISCONNECT) {
                if (this.listener && this.listener.onDisconnected) {
                    this.listener.target = this;
                    this.listener.onDisconnected.call(this.listener);
                }
                this.event = -1;
            }

            if (this.data.length > 0) {
                var data = this.data[0];
                if (this.listener && this.listener.onReceived) {
                    this.listener.onReceived.call(this.listener, 0, data);
                }
                this.data.splice(0, 1);
            }
        },

        connect: function (host, port, isSsl, listenner) {
            // cc.log("connect: " + host + " port: " + port);
            if (!useTCP) {
                if (port % 2 == 1) {
                    port = port + 1;
                }
            }
            if (isSsl) {
                port = port + 1;
            }
            // cc.log("create websocket client begin");
            this.ws = new WebSocket("ws" + (isSsl ? "s" : "") + "://" + host + ":" + port + "/ws");
            this.listener = listenner;
            this.ws.binaryType = "arraybuffer";
            this.ws.onopen = this.onSocketConnect.bind(this);
            this.ws.onclose = this.onSocketClose.bind(this);
            this.ws.onmessage = this.onSocketData.bind(this);
            this.ws.onerror = this.onSocketError.bind(this);
            console.log("init ws");
            // cc.log("create websocket client emd");
        },

        closeSocket: function () {

            if (!cc.sys.isNative || !useTCP) {
                this.ws.close();
            }
            else {
                this.ws.disconnect();
            }

        },

        onSocketConnect: function () {
            if (false) {
                this.event = EVENT_CONNECT_SUCCESS;
            } else {
                if (this.listener && this.listener.onFinishConnect) {
                    this.listener.target = this;
                    this.listener.onFinishConnect.call(this.listener, true);
                }
            }
        },

        onSocketClose: function () {
            cc.log("CONNECT CLOSED");
            if (false) {
                this.event = EVENT_DISCONNECT;
            } else {
                if (this.listener && this.listener.onDisconnected) {
                    this.listener.target = this;
                    this.listener.onDisconnected.call(this.listener);
                }
            }
        },
        onSocketData: function (a) {
            var data = new Uint8Array(a.data);
            if (false) {
                this.data.push(data);
            } else {
                if (this.listener && this.listener.onReceived) {

                    this.listener.onReceived.call(this.listener, 0, data);
                }
            }
        },
        onSocketError: function () {
            cc.log("error connect");
            if (false) {
                this.event = EVENT_CONNECT_ERROR;
            } else {
                if (this.listener && this.listener.onFinishConnect) {
                    this.listener.target = this;
                    this.listener.onFinishConnect.call(this.listener, false);
                }
            }
        },
        send: function (packet) {
            if (!cc.sys.isNative || !useTCP) {
                var data = new Int8Array(packet._length);

                for (var i = 0; i < packet._length; i++) {
                    data[i] = packet._data[i];
                }

                this.ws.send(data.buffer);
            }
            else {
                this.ws.send(packet);
            }
        }

    });
}.call(this));
