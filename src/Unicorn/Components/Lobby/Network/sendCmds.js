/**
 * Created by Admin on 8/3/2017.
 */
(function () {
    var dataTypes = uc.Network.dataTypes;

    var cmds = uc.Lobby.sendCmds = {
        login : {
            cmdId : 1,
            dataTypes : [{
                name : "username",
                type : dataTypes.STRING
            },{
                name : "password",
                type : dataTypes.STRING
            }]
        },
    };


}.call(this));