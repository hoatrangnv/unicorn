/**
 * Created by Admin on 7/21/2017.
 */
(function () {


    var Network = this.uc.Network = {};
    console.log("uc.MODE_DEPLOY",uc.MODE_DEPLOY);
    Network.configs =  uc.MODE_DEPLOY;
    Network.dataTypes = {
        BYTE : 1,
        SHORT : 2,
        UNSINGEDSHORT : 3,
        INT : 4,
        LONG : 5,
        DOUBLE : 6,
        STRING : 7
    };

}.call(this))
