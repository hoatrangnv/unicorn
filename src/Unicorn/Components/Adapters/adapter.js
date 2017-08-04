∂∂/**
 * Created by Admin on 8/3/2017.
 */
(function () {

    var adapter = uc.Adapter = function (name, id) {
        this.name = name;
        this.id = id;
    }

    adapter.prototype = new EventEmitter();


}.call(this));