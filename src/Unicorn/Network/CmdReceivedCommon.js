(function () {
  var root = this;

  var p = uc.Network.InPacket.prototype;

  var putFunctions = {
    1: p.getByte,
    2: p.getShort,
    3: p.getUnsignedShort,
    4: p.getInt,
    5: p.getLong,
    6: p.getDouble,
    7: p.String
  };

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
        setDataTypes: function () {

        },
        readData: function (dataTypes) {
          var _self = this;
          var returnData = {};
          dataTypes.forEach(function (item, index) {
            var dataType = item.type;
            var field = arguments[index];
            var fn = putFunctions[dataType];
            _self[item.name] = returnData[item.name] = fn.call(_self);
          });
          return returnData;
        }
      }
    )
  }
}.call(this));
