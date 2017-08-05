/**
 * Created by Admin on 8/3/2017.
 */
(function () {

    var adapter = uc.Adapter = function (name, id) {
        this.name = name;
        this.controllerId = id;
        this.constructor();
    };

    var p = adapter.prototype = new EventEmitter();
    p.constructor = function () {
        this.on("_cmd",function (inPacket) {
            this.emit(inPacket._cmdId, inPacket);
        });
    }

    p.sendMessage = function (outPacket) {
        uc.adapterManager.emit("sendCmd", outPacket);
    };

    p.listenCmd = function (cmd,callback) {
        this.on(cmd.cmdId,function () {
            var receivedCmd = new uc.Network.CmdReceivedCommon(data);
            var data = receivedCmd.readData(lobbyReceivedCmds.login);
        });
    }



}.call(this));