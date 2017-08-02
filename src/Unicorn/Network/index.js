/**
 * Created by Admin on 7/21/2017.
 */
(function () {

    var MODE_DEPLOY = {
        LOCAL: {
            HOST: "http://vinplay.com",
            BASE_URL: "http://api.vinplay.com:8081/api?",
            MAIN_WS: {
                HOST : "27.118.22.53",
                PORT : 8900,
                ISSSL : false
            }
        },
        TEST: {
            HOST: "http://210.211.101.230",
            BASE_URL: "http://210.211.101.230:8081/api?",
            MAIN_WS: {
                HOST : "27.118.22.53",
                PORT : 8900,
                ISSSL : false
            }
        },
        LIVE: {}
    }


    var Network = this.uc.Network = {};

    Network.configs =  MODE_DEPLOY.TEST;

}.call(this))
