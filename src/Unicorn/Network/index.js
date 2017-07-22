/**
 * Created by Admin on 7/21/2017.
 */
(function () {

    var Network = this.uc.Network = {};

    var ConnectState = Network.ConnectState = function () {
    }
    ConnectState.DISCONNECTED = 0;
    ConnectState.CONNECTING = 1;
    ConnectState.CONNECTED = 2;
    ConnectState.NEED_QUIT = 3;             // state khi client da disconnect va thong bao cho GUI hien tai de disconnect

}.call(this))
