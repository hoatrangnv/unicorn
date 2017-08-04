/**
 * Created by Admin on 8/3/2017.
 */
(function () {
    var Adapters = {
        "lobby" : 0
    }

    var adapter = uc.adapterManager = new EventEmitter();

    var _adapters = adapter._adapters = [];

    for(var prop in Adapters ){
        var temAdt = new uc.Adapter(prop, Adapters[prop]);
        _adapters.push(temAdt);
    }

    adapter.on("dataReceiver",function (inPacket) {
        this.con
    })

}.call(this));