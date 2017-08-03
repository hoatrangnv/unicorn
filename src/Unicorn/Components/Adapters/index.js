/**
 * Created by Admin on 8/3/2017.
 */
(function () {
    var Adapters = {
        "lobby" : 0
    }

    var adapter = uc.adapterManager = new EventEmitter();

    adapter._adapters = [];

}.call(this));