/**
 User: alfonso
 Data: 13/03/14 , 10:35
 */

var grid=[];
var musicaDeFondo;
var counter;

Menu=new function(){

    this.init=function(){


        console.log("Menu.init");


        if(nivell>4){numEscudos=5};// o numEscudos=nivell+3
        stage.removeChild(start);
        Assets.creaGrid(numCols);
        Assets.posaCastles();
        Assets.creaCastles();
        Assets.calientaSuplente();
        //Assets.ponFB();

        //stage.addEventListener("stagemousedown",GamePlay.mouseDownHandler);

        if(!stage.hasEventListener("mousedown")){
            stage.on("mousedown",TouchEvents.mouseDownHandler);
        }
        createjs.Ticker.removeEventListener("tick",Menu.tic);
        createjs.Ticker.addEventListener("tick", GamePlay.tic);

    };



    this.tic=function(){
        if(stage.children.indexOf(loading)!=-1){loading.rotation+=10;}
        stage.update();

    };


    this.pasarNivel=function(){
        console.log("NEXT LEVEL");
        //init vars
        tablero.removeAllChildren();
        stage.removeAllChildren();
        grid=[];
        stateCastles.corv=0;
        stateCastles.drac=0;
        stateCastles.lleo=0;
        stateCastles.llop=0;
        stateCastles.pop=0;
        llopCastleArr=[];
        lleoCastleArr=[];
        corvCastleArr=[];
        dracCastleArr=[];
        movX=0;
        movY=0;
        //

        numWin<3?numWin++:numWin=3;
        nivell++;


        Menu.init();
        TweenMax.to(stage,2,{alpha:1});

    };
};
