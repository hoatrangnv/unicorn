
(function () {
  var root = this;

  var CoCaro = uc.Caro;

  CoCaro.CoCaroSocket = uc.CardGameWebSocket.extend({
    ctor: function() {
      this._super();
    },

    sendTakeTurn: function(x, y){
      var packet = new CoCaro.CmdSendTakeTurn();
      packet.putData(x, y);
      this.send(packet);
      packet.clean();
    }
  });
}.call(this));