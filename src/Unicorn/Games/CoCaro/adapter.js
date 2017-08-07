/**
 * Created by Admin on 8/3/2017.
 */
(function () {

    var adapter = uc.CaroTestAdapter = function (name, id) {
        this.name = name;
        this.controllerId = id;
        this.constructor();
    };

    var p = adapter.prototype = new EventEmitter();
    p.constructor = function () {

        var CoCaroCmd = uc.Caro.CoCaroCmd;

        this.on(-CoCaroCmd.JOIN_ROOM_SUCCESS, function (inPacket) {
            var emitData = {'roomInfo': "roomInfo"};
            this.emit(CoCaroCmd.JOIN_ROOM_SUCCESS, emitData);
        });
    }

    p.sendMessage = function (cmd, data) {
        // uc.adapterManager.emit("sendCmd", outPacket);
        this.emit(cmd, data);
    };

    p.listenCmd = function (cmd, callbackSuccess, callbackError) {
        this.on(cmd.cmdId, function (data) {
            var error = data.getError();
            if (!error) {
                var data = data.readData(cmd.dataTypes);
                callbackSuccess && callbackSuccess(data);
            } else {
                callbackError && callbackError(error);
            }
        });
    }


}.call(this));