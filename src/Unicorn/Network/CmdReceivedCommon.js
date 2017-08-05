(function () {
    var root = this;

    if (cc.sys.isNative && useTCP) {
        engine.InPacket.extend = cc.Class.extend;
        var CmdReceivedCommon = uc.Network.CmdReceivedCommon = engine.InPacket.extend({
                _jData: "{}",
                ctor: function (pkg) {
                    this._super();
                    this.init(pkg);
                },
                readData: function () {

                },
                getLong: function () {
                    var kk = engine.InPacket.prototype.getLong.call(this);
                    return Number(kk);
                },
                getInt: function () {
                    var kk = engine.InPacket.prototype.getInt.call(this);
                    return Number(kk);
                },
                getShort: function () {
                    var kk = engine.InPacket.prototype.getShort.call(this);
                    return Number(kk);
                }
            }
        )
    } else {
        var CmdReceivedCommon = uc.Network.CmdReceivedCommon = uc.Network.InPacket.extend({
                _jData: "{}",
                ctor: function (pkg) {
                    this._super();
                    this.init(pkg);
                },
                setDataTypes : function () {

                },
                readData: function () {

                }
            }
        )
    }
}.call(this));
