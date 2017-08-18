/**
 * Created by Admin on 8/3/2017.
 */
(function () {

    var adapter = uc.adapterManager = new EventEmitter();
    var Adapters = adapter.adapters = {
        "lobby": 1
    }

    var _adapters = adapter._adapters = [];

    for (var prop in Adapters) {
        var temAdt = new uc.Adapter(prop, Adapters[prop]);
        _adapters.push(temAdt);
    }

    adapter.on("cmd", function (inPacket) {
        var controler = adapter.getAdapterById(inPacket._controllerId);
        controler && controler.emit('_cmd', inPacket);
    });

    adapter.on("sendCmd", function (outPacket) {
        var MainWs = uc.Network.MainWebsocket.getInstance();
        MainWs.sendMessage(outPacket);
    });

    adapter.getAdapterByName = function (name) {
        return _adapters.find(function (item, index) {
            return name == item.name;
        });
    };

    adapter.getAdapterById = function (ID) {
        return _adapters.find(function (item, index) {
            return ID == item.controllerId;
        });
    };


}.call(this));