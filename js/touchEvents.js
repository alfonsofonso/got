/**
 User: alfonso
 Data: 17/03/14 , 11:09
 */

var pieza;
var touchX=0;
var touchY=0;

var movX=0;
var movY=0;

var fondoChampions;


TouchEvents=new function(){

    this.horizontal=false;

    this.mouseDownHandler=function(e){ //                       mouse DOWN

        var trobat=false;

        for(var i=0;i<numCols;i++){
            for(var j=0;j<numCols;j++){
                if(e.target==grid[i][j].escut.children[0]){
                    pieza=grid[i][j];
                    trobat=true;
                    break
                }
            }
        }
        if(trobat){
            touchX= e.stageX;
            touchY= e.stageY;
            stage.addEventListener("pressmove",TouchEvents.arrastra);
            stage.addEventListener("pressup",TouchEvents.suelta);
        }
    };


    this.arrastra=function(e){ //                               mouse MOVE

        GamePlay.rearrange();

        movX = e.stageX - touchX;
        movY = e.stageY - touchY;

       //if(Math.abs(movX+movY)<10){return};

        if(Math.abs(movX) > Math.abs(movY) ){/// horizontal
            for(var i=0;i<numCols;i++){
                grid[i][pieza.fila].escut.x+=movX/5;
            }
            TouchEvents.horizontal=true;
        }else{   /// vertical
            for(var j=0;j<numCols;j++){
                grid[pieza.col][j].escut.y+=movY/5;
            }
            TouchEvents.horizontal=false;
        }
    };


    this.suelta=function(e){             //                          mouse UP
        if(Math.abs(movX) + Math.abs(movY)<margen){
            GamePlay.rearrange();
            return;
        }else{
            GamePlay.move();
            var instance = createjs.Sound.play("knife");
        }

        setTimeout(Assets.calientaSuplente,100);

        stage.removeAllEventListeners("mousedown");
        stage.removeAllEventListeners("pressmove");
        stage.removeAllEventListeners("pressup");

    };

    this.champions=function(){
        stage.removeAllEventListeners("mousedown");
        stage.removeAllEventListeners("pressmove");
        stage.removeAllEventListeners("pressup");
        if(fondoChampions==null||fondoChampions==undefined){
        fondoChampions = new createjs.Shape();
            fondoChampions.graphics.beginFill("black").drawRect( 0 , 0 , amp, alt ); //.drawCircle (50/RESOLUTION, 50/RESOLUTION, 50/RESOLUTION);
        }
        fondoChampions.alpha=0;
        stage.addChild(fondoChampions);
        TweenMax.to(fondoChampions,2,{alpha:1,onComplete:Champions.ponChampions});

    };

    this.facebook=function(){
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                console.log("conectado");
            }else if (response.status === 'not_authorized') {
                console.log("logueado pero sin autorización");
            }else{
                console.log("no logueado en fb");
            }
        });
    };

    this.switchMute=function(e){
        console.log("switchMute", e.target.alpha);
        if(e.target.alpha<1){
            e.target.alpha=1;
            musicaDeFondo.volume=1;
        }else{
            e.target.alpha=.5;
            musicaDeFondo.volume=0;
        }
    };

};