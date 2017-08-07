(function () {
    var root = this;

    var parent = (!cc.sys.isNative || !useTCP) ? uc.Network.OutPacket : engxine.OutPacket;

    var p = parent.prototype;

    var putFunctions = {
        1: p.putByte,
        2: p.putShort,
        3: p.putUnsignedShort,
        4: p.putInt,
        5: p.putLong,
        6: p.putDouble,
        7: p.putString
    };
    var dataTypes = uc.Network.dataTypes;

    var CmdSendCommon = uc.Network.CmdSendCommon = parent.extend({
        _jData: "{}",
        ctor: function () {
            this._super();
            this._dataTypes = []
        },
        initHeader: function (controlerId, cmd, size) {
            size = size || 100;
            this.initData(size);
            this.setControllerId(controlerId);
            this.setCmdId(cmd.cmdId);
            this._dataTypes = cmd.dataTypes;
            this.packHeader();
        },
        putData: function () {
            var _self = this;
            this._dataTypes.forEach(function (item, index) {
                var dataType = item.type;
                var field = arguments[index];
                var fn = putFunctions[dataType];
                fn.call(_self, field);
            });
            this.updateSize();
        }
    });
}.call(this));
