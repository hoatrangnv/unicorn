//
(function () {
    var root = this;
    var RoomItem = uc.GameManager.RoomItem = cc.Class.extend({
        ctor:function(getId, getUserCount, limitPlayer, maxUserPerRoom, moneyBet, requiredMoney, rule, nameRoom, key, quyban){
            this.roomId = getId;
            this.getUserCount = getUserCount;
            this.limitPlayer = limitPlayer;
            this.moneyBet = moneyBet;
            this.moneyRequire = requiredMoney;
            this.rule = rule;
            this.maxUserPerRoom = maxUserPerRoom;
            this.nameRoom = nameRoom;
            this.key = key;
            this.quyban = quyban;
        }
    });
}.call(this));