

(function () {
  var root = this;

  var TopGameItem = uc.TopGameItem = cc.Node.extend({
    ctor: function(){
      this._super();
      var font = fontArial;
      this.sizeBg = cc.size(100, 30);
      var lbName = new ccui.Text();
      lbName.setAnchorPoint(cc.p(0.5,0.5));
      lbName.setFontName(RobotoRegular.fontName);
      lbName.setFontSize(19);
      lbName.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
      lbName.setColor(cc.color.WHITE);
      lbName.setColor({r:247, g:235, b:198});
      lbName.setString("KhanhThinh");
      lbName.setPosition(this.sizeBg.width*0.0, this.sizeBg.height*0.0);
      this.addChild(lbName);
      this.lbName = lbName;

      var lbWinThang = new ccui.Text();
      lbWinThang.setAnchorPoint(cc.p(0.5,0.5));
      lbWinThang.setFontName(RobotoRegular.fontName);
      lbWinThang.setFontSize(19);
      lbWinThang.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
      lbWinThang.setColor(cc.color("#000000"));
      lbWinThang.setString("88");
      lbWinThang.setPosition(this.sizeBg.width*2.0 + 10, this.sizeBg.height*0.0);
      this.addChild(lbWinThang);
      this.lbWinThang = lbWinThang;

      var lbTranThang = new ccui.Text();
      lbTranThang.setAnchorPoint(cc.p(0.5,0.5));
      lbTranThang.setFontName(RobotoRegular.fontName);
      lbTranThang.setFontSize(19);
      lbTranThang.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
      lbTranThang.setColor({r:247, g:235, b:198});
      lbTranThang.setString("88");
      lbTranThang.setPosition(this.sizeBg.width*2.0 + 205, this.sizeBg.height*0.0);
      this.addChild(lbTranThang);
      this.lbTranThang = lbTranThang;
    },

    updateWithItem: function(i, item, isVin, isMoney){
      this.lbName.setString(item.n);

      this.lbWinThang.setString(StringUtility.standartNumber(item.m));
      this.lbTranThang.setString(StringUtility.standartNumber(item.c));

      if(isVin){
        this.lbWinThang.setColor(cc.color("#E702FE"));
      }
      else{
        this.lbWinThang.setColor({r:247, g:235, b:198});
      }

      //this.lbTranThang.setString(item.c);
      this.setVisible(true);
    }
  });

    var TopGameLayer = uc.TopGameLayer = uc.BaseLayer.extend({
      ctor: function(){
        this._super("TopGame");
        this.initWithBinaryFile("res/g_res_cardGame_json_TopGame.json");
        this.randType = MONEY_VIN;
        this.isWeek = 0; // 0 : day ; 1 : week ; 2 : month
        this.isMoney = true;
        this.cellSize= null;
        this.listContent = [];
      },

      createContent: function(){
        for(var i = 0; i < 10; i++){
          var topItem = new TopGameItem();
          this.listContent.push(topItem);
          topItem.setVisible(false);
          this.bg.addChild(topItem);
          topItem.setPosition(cc.p(this.startPos.x, this.startPos.y - 31*i));
        }
        this.reloadTable();
      },

      onEnter: function(){
        BaseLayer.prototype.onEnter.call(this);
      },

      customizeGUI: function(){
        var winSize = GameScene.getMainContentSize();
        this.bg = ccui.helper.seekWidgetByName(this._layout, "xepHangBg0");

        this.content = ccui.helper.seekWidgetByName(this._layout, "xepHangContent");

        this.btnVin = this.customButton("btnVinXepHang", TopGameLayer.BTN_RANK_VIN);
        this.btnXu = this.customButton("btnXuXepHang", TopGameLayer.BTN_RANK_XU);

        this.btnDay = this.customButton("btnDay", TopGameLayer.BTN_DAY);
        this.btnWeek = this.customButton("btnWeek", TopGameLayer.BTN_WEEK);
        this.btnAll = this.customButton("btnAll", TopGameLayer.BTN_ALL);

        this.btnTienThang = this.customButton("btnTienThang", TopGameLayer.BTN_WIN_MONEY);
        this.btnTranTrang = this.customButton("btnTranThang", TopGameLayer.BTN_WIN_NUMBER);


        this.btnClose_top = this.customButton("btnClose_top", TopGameLayer.BTN_CLOSE_TOP);

        this.lbTienThang = ccui.helper.seekWidgetByName(this.btnTienThang, "winThangXepHang");
        this.lbTranThang = ccui.helper.seekWidgetByName(this.btnTranTrang, "tranThangXepHang");

        this.updateColorTienThang();

        this.startPos = ccui.helper.seekWidgetByName(this._layout, "startNode").getPosition();
        this.createContent();
      },

      //overrided
      onButtonRelease: function(btn, id){
        cc.log("btn" + id);
        switch(id){
          case TopGameLayer.BTN_RANK_VIN:
          case TopGameLayer.BTN_RANK_XU:
            this.touchBtnTab(id);
            break;
          case TopGameLayer.BTN_DAY:
            if(this.isWeek != 0) {
              this.isWeek = 0;
              this.reloadTable();
              this.btnDay.loadTextures(Res.btnXepHangSelected, Res.btnXepHangSelected, Res.btnXepHangUnselected);
              this.btnWeek.loadTextures(Res.btnXepHangMidUnselected, Res.btnXepHangMidSelected, Res.btnXepHangMidUnselected);
              this.btnAll.loadTextures(Res.btnXepHangUnselected, Res.btnXepHangSelected, Res.btnXepHangUnselected);
            }
            break;
          case TopGameLayer.BTN_WEEK:
            if(this.isWeek != 1) {
              this.isWeek = 1;
              this.reloadTable();
              this.btnDay.loadTextures(Res.btnXepHangUnselected, Res.btnXepHangSelected, Res.btnXepHangUnselected);
              this.btnWeek.loadTextures(Res.btnXepHangMidSelected, Res.btnXepHangMidSelected, Res.btnXepHangMidUnselected);
              this.btnAll.loadTextures(Res.btnXepHangUnselected, Res.btnXepHangSelected, Res.btnXepHangUnselected);
            }
            break;
          case TopGameLayer.BTN_ALL:
            if(this.isWeek != 2) {
              this.isWeek = 2;
              this.reloadTable();
              this.btnDay.loadTextures(Res.btnXepHangUnselected, Res.btnXepHangSelected, Res.btnXepHangUnselected);
              this.btnWeek.loadTextures(Res.btnXepHangMidUnselected, Res.btnXepHangMidSelected, Res.btnXepHangMidUnselected);
              this.btnAll.loadTextures(Res.btnXepHangSelected, Res.btnXepHangSelected, Res.btnXepHangUnselected);
            }
            break;
          case TopGameLayer.BTN_WIN_MONEY:
            if(this.isMoney == false){
              this.isMoney = true;
              this.reloadTable();
              this.btnTienThang.loadTextures(Res.vinWinSelect, Res.vinWinSelect, Res.vinWinUnselect);
              this.btnTranTrang.loadTextures(Res.numWinUnselect, Res.numWinSelect, Res.numWinUnselect);
            }
            this.updateColorTienThang();
            break;
          case TopGameLayer.BTN_WIN_NUMBER:
            if(this.isMoney == true){
              this.isMoney = false;
              this.reloadTable();
              this.btnTienThang.loadTextures(Res.vinWinUnselect, Res.vinWinSelect, Res.vinWinUnselect);
              this.btnTranTrang.loadTextures(Res.numWinSelect, Res.numWinSelect, Res.numWinUnselect);
            }
            this.updateColorTienThang();
            break;
          case TopGameLayer.BTN_CLOSE_TOP:
            this.setVisible(false);
            break;
        }
      },

      updateColorTienThang: function(){
        if(this.isMoney){
          //this.lbTienThang.setColor(cc.color("#FFDF58"));
          //this.lbTranThang.setColor(cc.color("#FFDF58"));
        }
        else{
          //this.lbTienThang.setColor(cc.color("#FFDF58"));
          //this.lbTranThang.setColor(cc.color("#FFDF58"));
        }
      },


      touchBtnTab: function(id){
        if(id == TopGameLayer.BTN_RANK_VIN){
          this.btnVin.loadTextures(Res.btnRankVinSelected, Res.btnRankVinSelected, Res.btnRankVinUnselected);
          this.btnXu.loadTextures(Res.btnRankXuUnselected, Res.btnRankXuUnselected, Res.btnRankXuUnselected);
          if(gameLobbyInstance.type_topxh != MONEY_VIN) {
            gameLobbyInstance.type_topxh = MONEY_VIN;
            this.randType = MONEY_VIN;
            gameWsClient.sendTopServer(gameLobbyInstance.type_topxh);
            this.lbTienThang.setString("VIN Thắng");
          }
        }
        else if(id == TopGameLayer.BTN_RANK_XU){
          this.btnVin.loadTextures(Res.btnRankVinUnselected, Res.btnRankXuSelected, Res.btnRankXuSelected);
          this.btnXu.loadTextures(Res.btnRankXuSelected, Res.btnRankXuUnselected, Res.btnRankXuUnselected);
          if(gameLobbyInstance.type_topxh != MONEY_XU) {
            gameLobbyInstance.type_topxh = MONEY_XU;
            this.randType = MONEY_XU;
            gameWsClient.sendTopServer(gameLobbyInstance.type_topxh);
            this.lbTienThang.setString("XU Thắng");
          }
        }
      },

      reloadTable: function(){
        if(this.randType == MONEY_VIN){
          if(this.isWeek == 0){
            if(this.isMoney){
              this.topList = gameData.topDayVin_money;
            }
            else{
              this.topList = gameData.topDayVin_number;
            }
          }else if(this.isWeek == 1){
            if(this.isMoney){
              cc.log("vin thang + tuan");
              this.topList = gameData.topWeekVin_money;
            }
            else{
              cc.log("tran vin thang + tuan");
              this.topList = gameData.topWeekVin_number;
            }
          }else{
            if(this.isMoney){
              this.topList = gameData.topMonthVin_money;
            }
            else{
              this.topList = gameData.topMonthVin_number;
            }
          }
        }else{
          if(this.isWeek == 0){
            if(this.isMoney){
              this.topList = gameData.topDayXu_money;
            }
            else{
              this.topList = gameData.topDayXu_number;
            }
          }else if(this.isWeek == 1){
            if(this.isMoney){
              cc.log("xu thang + tuan");
              this.topList = gameData.topWeekXu_money;
            }
            else{
              cc.log("tran xu thang + tuan");
              this.topList = gameData.topWeekXu_number;
            }
          }else{
            if(this.isMoney){
              this.topList = gameData.topMonthXu_money;
            }
            else{
              this.topList = gameData.topMonthXu_number;
            }
          }
        }


        for(var i = 0; i < 10; i++) {
          if( i < this.topList.length){
            this.listContent[i].setVisible(true);
            if(this.randType == MONEY_VIN) {
              if(this.isMoney){
                this.listContent[i].updateWithItem(i, this.topList[i], true, true);
              }
              else{
                this.listContent[i].updateWithItem(i, this.topList[i], true, false);
              }

            }
            else{
              if(this.isMoney){
                this.listContent[i].updateWithItem(i, this.topList[i], false, true);
              }
              else{
                this.listContent[i].updateWithItem(i, this.topList[i], false, false);
              }
            }
          }else {
            this.listContent[i].setVisible(false);
          }
        }
      }
    });

  TopGameLayer.BTN_RANK_VIN = 1001;
  TopGameLayer.BTN_RANK_XU = 1002;
  TopGameLayer.BTN_WEEK = 1003;
  TopGameLayer.BTN_ALL = 1004;
  TopGameLayer.BTN_WIN_MONEY = 1005;
  TopGameLayer.BTN_WIN_NUMBER = 1006;
  TopGameLayer.BTN_CLOSE_TOP = 1007;
  TopGameLayer.BTN_DAY = 1008;
}.call(this));