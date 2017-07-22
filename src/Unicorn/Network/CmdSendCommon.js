(function () {
    var root = this;

    var parent = (!cc.sys.isNative || !useTCP) ? uc.Network.OutPacket : engine.OutPacket;

    var CmdSendCommon = uc.Network.CmdSendCommon = parent.extend({
            _jData: "{}",
            ctor: function () {
                this._super();
            }
        }
    )
}.call(this));
