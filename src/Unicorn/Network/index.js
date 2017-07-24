/**
 * Created by Admin on 7/21/2017.
 */
(function () {

  var MODE_DEPLOY = {
    LOCAL: {
      HOST: "http://vinplay.com",
      BASE_URL: "http://api.vinplay.com:8081/api?"
    },
    TEST: {
      HOST: "http://210.211.101.230",
      BASE_URL: "http://210.211.101.230:8081/api?"
    },
    LIVE: {}
  }


  var Network = this.uc.Network = {};

  Network.setModel = function(){
    thí.s
  };

  var ConnectState = Network.ConnectState = function () {
  }
  ConnectState.DISCONNECTED = 0;
  ConnectState.CONNECTING = 1;
  ConnectState.CONNECTED = 2;
  ConnectState.NEED_QUIT = 3;             // state khi client da disconnect va thong bao cho GUI hien tai de disconnect

}.call(this))
