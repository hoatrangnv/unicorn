(function () {
    var root = this;

    var PacketIn = uc.PacketIn = cc.Class.extend({
        ctor: function () {

        },
        init: function (pkg) {
            this._pos = 0;
            this._data = pkg;
        },
        clean: function () {

        }
    });

}.call(this));

