var BangLichSuTheLeHuVang = MiniGameBaseLayer.extend({
    ctor: function(){
        this._super("");

        var posInitialX = 0;
        var posInitialY = 0;
        var isShowing = false;

        this.btnClose = null;
        this.btnVinhDanh = null;
        this.btnTheLe = null;

        this.lbTextBaCay = null;
        this.lbTextBaCao = null;
        this.lbTextSam = null;
        this.lbTextTienLen = null;
        this.lbTextMauBinh = null;

        this.pnVinhDanh = null;
        this.pnTheLe = null;

        //this.lv_vinhdanh = null;
        //this.arrVinhdanh = [];
        //this.pn_title = null;
        //this.btn_backall = null;

        this.btnBack = null;
        this.btnNext = null;
        this.btnNextAll = null;
        this.lbCurrentPage = null;

        this.currentPage = 1;
        this.totalPage = 1;
        this.isWait = false;
        cc.log("cclog2 bang the le kaka2");
        this.initWithBinaryFile("res/g_res_cardGame_json_theLeGameBai.json");
        cc.log("cclog2 bang the le");
    },

    customizeGUI: function(){
        cc.log("begin customizeGUI ");
        this.pnHuongDan = this._layout.getChildByName("pnHuongDan");
        var arrayRootChildren = this._layout.getChildren();
        cc.log("length: " + arrayRootChildren.length);
        var length = arrayRootChildren.length;
        for (var i = 0; i < length; i++) {
            var child = arrayRootChildren[i];
            if(child.getName() == "pnHuongDan"){
                this.pnHuongDan = child;
            }
            cc.log(child.getName());
        }

        cc.log(this._layout);

        cc.log(this.pnHuongDan);
        cc.log("begin customizeGUI1_0");
        this.pnHuongDan.setScale(0);
        cc.log("begin customizeGUI1_2");
        this.pnHuongDan.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(this.onshow, this)));
        cc.log("begin customizeGUI2");

        this.pnVinhDanh = this.pnHuongDan.getChildByName("pnVinhDanh");
        this.pnTheLe = this.pnHuongDan.getChildByName("pnTheLe");
        cc.log("begin customizeGUI3");


        this.btnClose = this.customButton("btnCloseGuild", BangLichSuTheLeHuVang.BTN_CLOSE, this.pnHuongDan);

        this.btnVinhDanh = this.customButton("btnVinhDanh", BangLichSuTheLeHuVang.BTN_VINHDANH, this.pnHuongDan);
        this.btnTheLe = this.customButton("btnTheLe", BangLichSuTheLeHuVang.BTN_THELE, this.pnHuongDan);
        cc.log("begin customizeGUI3");

        this.pnTitle = this.pnVinhDanh.getChildByName("pnTitle");
        this.lbCurrentPage = this.pnTitle.getChildByName("lbCurrentPage");
        cc.log("begin customizeGUI4");

        this.btnBackAll = this.customButton("btn_backall", BangLichSuTheLeHuVang.BTN_BACKALL_VINHDANH, this.pnTitle);
        this.btnBack = this.customButton("btn_back", BangLichSuTheLeHuVang.BTN_BACK_VINHDANH, this.pnTitle);
        this.btnNext = this.customButton("btn_next", BangLichSuTheLeHuVang.BTN_NEXT_VINHDANH, this.pnTitle);
        this.btnNextAll = this.customButton("btn_nextall", BangLichSuTheLeHuVang.BTN_NEXTALL_VINHDANH, this.pnTitle);
        cc.log("begin customizeGUI5");

        this.scrollTheLe = ccui.helper.seekWidgetByName(this.pnTheLe, "scrollTheLe");
        this.scrollTheLe.setTouchEnabled(true);
        cc.log("begin customizeGUI6");

        this.scrollTheLe.setClippingEnabled(true);
        this.scrollTheLe.setScrollBarEnabled(false);
        cc.log("begin customizeGUI7");

        this.tableVinhDanh = ccui.helper.seekWidgetByName(this.pnVinhDanh, "bangVinhDanhTable");
        cc.log("begin customizeGUI7");
        this.addMasterLayer(this.pnHuongDan);
        cc.log("begin customizeGUI8");
    },

    onshow: function () {
        this.pnHuongDan.runAction(cc.scaleTo(0.2, 1));
    },

    onButtonRelease: function(button, id){
        switch(id) {
            case BangLichSuTheLeHuVang.BTN_CLOSE:{
                this.closeHuongDan();
                break;
            }
                break;
            case BangLichSuTheLeHuVang.BTN_VINHDANH:
                if (this.isWait == false) {
                    this.gotoGuiVinhDanh();
                }
                break;
            case BangLichSuTheLeHuVang.BTN_THELE:
                if (this.isWait == false) {
                    this.gotoGuiTheLe();
                }
                break;
            case BangLichSuTheLeHuVang.BTN_BACKALL_VINHDANH:
                if (this.isWait == false) {
                    if (this.currentPage != 1) {
                        this.currentPage = 1;
                        this.getLichSuVinhDanh();
                    }
                }
                break;
            case BangLichSuTheLeHuVang.BTN_BACK_VINHDANH:
                if (this.isWait == false) {
                    if (this.currentPage > 1) {
                        this.currentPage = this.currentPage - 1;
                        this.getLichSuVinhDanh();
                    }
                }
                break;
            case BangLichSuTheLeHuVang.BTN_NEXT_VINHDANH:
                if (this.isWait == false) {
                    if (this.currentPage < this.totalPage) {
                        this.currentPage = this.currentPage + 1;
                        this.getLichSuVinhDanh();
                    }
                }
                break;

            case BangLichSuTheLeHuVang.BTN_NEXTALL_VINHDANH:
                if (this.isWait == false) {
                    if (this.currentPage != this.totalPage) {
                        this.currentPage = this.totalPage;
                        this.getLichSuVinhDanh();
                    }
                }
                break;
        }
    },

    gotoGuiVinhDanh: function () {
        this.pnVinhDanh.setVisible(true);
        this.pnTheLe.setVisible(false);
        this.btnTheLe.setEnabled(true);
        this.btnVinhDanh.setEnabled(false);

        this.btnTheLe.loadTextures("res/Minigame/ImageChung/btn_button_tab_s.png","res/Minigame/ImageChung/btn_button_tab.png","res/Minigame/ImageChung/btn_button_tab_s.png");
        this.btnVinhDanh.loadTextures("res/Minigame/ImageChung/btn_button_tab.png","res/Minigame/ImageChung/btn_button_tab.png","res/Minigame/ImageChung/btn_button_tab.png");
        this.getLichSuVinhDanh();
    },

    gotoGuiTheLe: function() {
        this.pnVinhDanh.setVisible(false);
        this.pnTheLe.setVisible(true);
        this.btnTheLe.setEnabled(false);
        this.btnVinhDanh.setEnabled(true);

        this.btnVinhDanh.loadTextures("res/Minigame/ImageChung/btn_button_tab_s.png","res/Minigame/ImageChung/btn_button_tab.png","res/Minigame/ImageChung/btn_button_tab_s.png");
        this.btnTheLe.loadTextures("res/Minigame/ImageChung/btn_button_tab.png", "res/Minigame/ImageChung/btn_button_tab.png", "res/Minigame/ImageChung/btn_button_tab.png");
        //this.getLichSuVinhDanh();
    },

    addLoading: function() {
        if (this.pnHuongDan.getChildByName("loadingdata") == null) {
            var loading = new cc.Sprite();
            loading.initWithFile("res/ResourceMenuTab/Mail/btnRefresh.png", cc.rect(0, 0, 60, 60));
            loading.setPosition(cc.p(353.11, 204));
            loading.setName("loadingdata");
            this.pnHuongDan.addChild(loading);
            var rotateByVT = new cc.RotateBy(1, 360);
            loading.runAction(cc.repeatForever(rotateByVT));
        } else {
            var rotateByVT = new cc.RotateBy(1, 360);
            this.pnHuongDan.getChildByName("loadingdata").setVisible(true);
            this.pnHuongDan.getChildByName("loadingdata").runAction(cc.repeatForever(rotateByVT));
        }
    },

    closeLoading: function() {
        this.pnHuongDan.getChildByName("loadingdata").stopAllActions();
        this.pnHuongDan.getChildByName("loadingdata").setVisible(false);
    },

    callBackError: function(response) {
        this.isWait = false;
        this.closeLoading();
    },

    getLichSuVinhDanh: function() {
        var url = this.getUrlLichSuHuGameBai(this.currentPage);
        sendRequest(url, null, false, this.callBackVinhDanh.bind(this), this.callBackError.bind(this));
        this.isWait = true;
        this.addLoading();
    },

    getUrlLichSuHuGameBai: function(page)
    {
        return BASE_URL + "c=110&p=" + page;
    },


    callBackVinhDanh: function(response) {
        //"nickname":"canhnb","room":100000,"potValue":86395,"moneyWin":34558,"gamename":"Binh","description":"Binh"}
        var jsonData = JSON.parse(response);
        var success = jsonData["success"];
        var errorCode = jsonData["errorCode"];
        this.totalPage = jsonData["totalPages"];
        if (this.totalPage > 100){
            this.totalPage = 100;
        }

        this.lbCurrentPage.setString(this.currentPage + "/" + this.totalPage);

        if(success) {
            if (this.arrVinhdanh != null) {
                while (this.arrVinhdanh.length > 0) {
                    this.arrVinhdanh.pop();
                }
            }

            this.arrVinhdanh = [];

            var tempArrayVinhDanh = jsonData["noHu"];


            if (tempArrayVinhDanh != "") {
                for (var i = 0; i < tempArrayVinhDanh.length; i++) {
                    var counter = tempArrayVinhDanh[i];
                    this.arrVinhdanh.push(counter);
                }
            }
            this.reload_BangThanhTich();
        }

        this.closeLoading();
        this.isWait = false;
    },


    formatDateTime : function (str){
        var date = str.split(" ")[0];
        var time  = str.split(" ")[1];
        var day = date.split("-")[2];
        var month = date.split("-")[1];
        var year = date.split("-")[0];
        //cc.log("chuoi " + time + " "+  day + "/" + month + "/" + year);
        str = time + " " + day + "/" + month + "/" + year;
        return str;
    },

    reload_BangThanhTich: function () {
        this.tableVinhDanh.removeAllItems();
        var cellHeight = 30;
        var positionY = 12;

        var fonts = {fontName: "Roboto-Regular", src: [{src: "res/Font/Roboto-Regular.ttf", type: "truetype"}]};

        for (var i = 0; i < this.arrVinhdanh.length; i++) {
            var cl1 = new ccui.Layout();
            cl1.height = cellHeight;
            cl1.width = this.tableVinhDanh.width;

            var cellList = null;

            if(i % 2 == 0) {
                cellList = new cc.LayerColor(cc.color(25, 23, 88, 160));
            } else {
                cellList = new cc.LayerColor(cc.color("#39489E"));
            }

            //cellList.setBackGroundColorOpacity(50);

            cellList.height = cellHeight;
            cellList.width = this.tableVinhDanh.width;

            var lbTime = new cc.LabelTTF('', fonts.fontName, 14, cc.size(140, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbTime.setAnchorPoint(0.5, 0.5);
            lbTime.setPosition(cc.p(69.21, positionY));
            lbTime.setString(this.formatDateTime(this.arrVinhdanh[i].createTime));
            lbTime.setColor(cc.color("#e8daad"));

            var lbAccount = new cc.LabelTTF('', fonts.fontName, 14, cc.size(142, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbAccount.setPosition(cc.p(210.42, positionY));
            lbAccount.setString(this.arrVinhdanh[i].nickname);
            lbAccount.setColor(cc.color("#e8daad"));

            var lbPhong = new cc.LabelTTF('', fonts.fontName, 14, cc.size(100, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbPhong.setPosition(cc.p(314.14, positionY));
            lbPhong.setString(formatMoney(0, 3, parseInt(this.arrVinhdanh[i].room)));
            lbPhong.setColor(cc.color("#e8daad"));

            var lbThang = new cc.LabelTTF('', fonts.fontName, 14, cc.size(130, cellHeight), cc.TEXT_ALIGNMENT_RIGHT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbThang.setPosition(cc.p(388.42, positionY));
            lbThang.setString(formatMoney(0, 3, parseInt(this.arrVinhdanh[i].moneyWin)));
            lbThang.setColor(cc.color("#E702FE"));


            var lbHu = new cc.LabelTTF('', fonts.fontName, 14, cc.size(130, cellHeight), cc.TEXT_ALIGNMENT_RIGHT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbHu.setPosition(cc.p(505, positionY));
            lbHu.setString(formatMoney(0, 3, parseInt(this.arrVinhdanh[i].potValue)));
            lbHu.setColor(cc.color("#E702FE"));

            var lbGame = new cc.LabelTTF('', fonts.fontName, 14, cc.size(118, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbGame.setPosition(cc.p(638.81, positionY));

            var gameNameString = this.arrVinhdanh[i].gamename;
            if(gameNameString == "BaCay"){
                gameNameString = "Ba Cây";
            }else if(gameNameString == "BaiCao"){
                gameNameString = "Bài Cào"
            }else if(gameNameString == "Tlmn"){
                gameNameString = "Tiến lên";
            }else if(gameNameString == "Binh"){
                gameNameString = "Mậu Binh";
            }else if(gameNameString == "Sam"){
                gameNameString = "Sâm";
            }

            lbGame.setString(gameNameString);

            lbGame.setColor(cc.color("#e8daad"));

            if (this.arrVinhdanh[i].nickname == lobby.userInfo.nickname) {
                lbTime.setColor(cc.color("#F3F354"));
                lbAccount.setColor(cc.color("#F3F354"));
                lbPhong.setColor(cc.color("#F3F354"));
            }

            var aSprite1 = new cc.Sprite();
            aSprite1.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
            aSprite1.setScaleY(1);
            aSprite1.setScaleX(2);
            aSprite1.setPosition(cc.p(146.00, positionY + 3));

            var aSprite2 = new cc.Sprite();
            aSprite2.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
            aSprite2.setScaleY(1);
            aSprite2.setScaleX(2);
            aSprite2.setPosition(cc.p(284.0, positionY + 3));

            var aSprite3 = new cc.Sprite();
            aSprite3.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
            aSprite3.setScaleY(1);
            aSprite3.setScaleX(2);
            aSprite3.setPosition(cc.p(353.84, positionY + 3));

            var aSprite4 = new cc.Sprite();
            aSprite4.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
            aSprite4.setScaleY(1);
            aSprite4.setScaleX(2);
            aSprite4.setPosition(cc.p(464.50, positionY + 3));

            var aSprite5 = new cc.Sprite();
            aSprite5.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
            aSprite5.setScaleY(1);
            aSprite5.setScaleX(2);
            aSprite5.setPosition(cc.p(580.87, positionY + 3));

            cellList.addChild(lbTime);
            cellList.addChild(lbAccount);
            cellList.addChild(lbPhong);
            cellList.addChild(lbThang);
            cellList.addChild(lbGame);
            cellList.addChild(lbHu);

            cellList.addChild(aSprite1);
            cellList.addChild(aSprite2);
            cellList.addChild(aSprite3);
            cellList.addChild(aSprite4);
            cellList.addChild(aSprite5);

            cl1.addChild(cellList);
            this.tableVinhDanh.pushBackCustomItem(cl1);
            this.closeLoading();
        }
    },
       //

    openHuongDan: function () {
        this.setVisible(true);
        if (!this.isShowing) {
            cc.eventManager.resumeTarget(this.pnHuongDan, true);
            this.pnHuongDan.runAction(cc.scaleTo(0.2, 1));
            this.setTag(Minigame.INDEX_MINI_SLOT + 189);
        }

        this.isShowing = true;
        this.gotoGuiVinhDanh();
        this.reOpenLayer(this.pnHuongDan);
    },

    closeHuongDan: function (){
        if (this.isShowing){
            this.closeLayer(this.pnHuongDan);
            this.setVisible(false);
            this.pnHuongDan.setScale(0);
            cc.eventManager.pauseTarget(this.pnHuongDan, true);
            this.isShowing = false;
        }
    }
});

BangLichSuTheLeHuVang.BTN_CLOSE = 1;
BangLichSuTheLeHuVang.BTN_VINHDANH = 2;
BangLichSuTheLeHuVang.BTN_THELE = 3;
BangLichSuTheLeHuVang.BTN_BACKALL_VINHDANH = 4;
BangLichSuTheLeHuVang.BTN_BACK_VINHDANH = 5;
BangLichSuTheLeHuVang.BTN_NEXTALL_VINHDANH = 6;
BangLichSuTheLeHuVang.BTN_NEXT_VINHDANH = 7;


var bangLichSuHuVangInstance = null;

//openLichSuHuVang = function (value) {
//    if (bangLichSuHuVangInstance == null){
//
//        //caothap_vinhdanhX = caothap_vinhdanh.getPosition().x;
//        //caothap_vinhdanhY = caothap_vinhdanh.getPosition().y;
//        var curScene = SceneMgr.getInstance().getRunningScene();
//        curScene.addGUI(bangLichSuHuVangInstance, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_MINI_SLOT + 100);
//    }
//    else
//    {
//        caothap_vinhdanh.setVisible(true);
//        caothap_vinhdanh.pn_vinhdanh.runAction(cc.scaleTo(0.2,1));
//        cc.eventManager.resumeTarget(caothap_vinhdanh.pn_vinhdanh, true);
//        caothap_vinhdanh.setTag(Minigame.INDEX_MINI_SLOT + 189);
//    }
//
//
//    bangLichSuHuVangInstance.isShowing = true;
//    bangLichSuHuVangInstance.gotoGui(value);
//    bangLichSuHuVangInstance.reOpenLayer();
//};

BangLichSuTheLeHuVang.getInstance = function(){
    if(bangLichSuHuVangInstance == null){
        bangLichSuHuVangInstance = new BangLichSuTheLeHuVang();
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(bangLichSuHuVangInstance, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_MINI_SLOT + 100);
    }

    return bangLichSuHuVangInstance;
}


