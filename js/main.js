
var amp=960;
var alt=1440;
var dit;
var start, startGoal, castGoal;

var nivelNumText;
var nivell=1;

var socialStatus="unauthorized";// authorized || disconnected

Main= new function(){

    var RESOLUTION=1;
    var tocX,tocY;

    this.init=function(){
        console.log("gudmornin");
        if("Audio" in window!=true){
            alert("no Audio in your browser");
        }
        Main.windowResize();

        Main.creaStage();
    };

    this.windowResize =function ()
    {
        console.log("resizo");
        var canvas = $("#mainCanvas");

        var ratio =   alt/amp;
        var height = canvas.css('height').substring(0, canvas.css('height').lastIndexOf('px') );
        if( $(window).height() != height)
        {
            canvas.css( 'height', $(window).height()+ 'px' );
            canvas.css( 'width',  ($(window).height() / ratio) + 'px' );
        }

        var width = canvas.css('width').substring(0, canvas.css('width').lastIndexOf('px') );
        if( $(window).width() < width)
        {
            canvas.css('width', $(window).width()+ 'px');
            canvas.css('height', $(window).width() * ratio+'px');
        }
    };

    this.creaStage=function(){

        stage = new createjs.Stage(document.getElementById("mainCanvas"));

        fondo = new createjs.Shape();
        fondo.graphics.beginFill("black").drawRect( 0 , 0 , amp/RESOLUTION, alt/RESOLUTION ); //.drawCircle (50/RESOLUTION, 50/RESOLUTION, 50/RESOLUTION);

        fondo.cache(0, 0, amp/RESOLUTION, alt/RESOLUTION);
        fondo.x = 0;
        fondo.y = 0;
        stage.addChild(fondo);


        Main.windowResize();

        createjs.Ticker.addEventListener("tick", Menu.tic);
        createjs.Touch.enable(stage);

        //createjs.Ticker.setFPS(30);

        Loader.cargaAssets();

    };

    this.empezar=function(){

        Assets.ponLasBases();

        ////////////////////////////////////////////////     tutorial ////////////////

        if(castGoal==null || castGoal==undefined){
            castGoal=new createjs.Bitmap(imatges["castH"]);
            castGoal.scaleX=castGoal.scaleY=2.3;
            castGoal.alpha=.6;
            castGoal.y=alt/6;
            castGoal.x=10;
        }
        stage.addChild(castGoal);

        if(startGoal==null || startGoal==undefined){
            startGoal=new createjs.Bitmap(imatges["corvGrey"]);
            startGoal.scaleX=startGoal.scaleY=.8;
            startGoal.x=amp/5;
            startGoal.y=alt/4;
        }
        stage.addChild(startGoal);

        if(start==null || start==undefined){
            start=Assets.dameEscudo(2);
            start.on("mousedown",Main.arrosega);
        }
        start.x=amp/2;
        start.y=alt/1.5;
        stage.addChild(start);

        if(dit==null || dit==undefined){
            dit=new createjs.Bitmap(imatges["dit"]);
            dit.x=amp/1.6;
            dit.y=alt/1.5;
            stage.addChild(dit);
            TweenMax.to(dit,3,{y:alt/3,repeat:-1,ease:Sine.easeInOut});
        }

    };

    this.arrosega=function(e){
        console.log("arrossego");
        TweenMax.killTweensOf(start);
        tocX= e.stageX;
        tocY= e.stageY;
        stage.on("pressmove",Main.arrosegant);
        stage.on("pressup",Main.suelta);
    };

    this.arrosegant=function(e){
        var ig=tocY- e.stageY;

        start.y=tocY-ig;

        if(start.y<=startGoal.y+alt/8){

            stage.off("mousedown",Main.arrosega);
            stage.off("pressmove",Main.arrosegant);
            stage.removeAllEventListeners("pressmove");
            stage.off("pressup",Main.suelta);
            TweenMax.killAll();
            TweenMax.to(start,1,{y:startGoal.y+150,x:amp/2,onComplete:Main.fadeOut});//start.y=startGoal.y;
            stage.removeChild(startGoal);
            musicaDeFondo = createjs.Sound.play("COT","none",0,0,-1);
            castGoal.alpha=1;
            //startGoal.alpha=1;
        }

    };

    this.suelta=function(e){
        if(start.y>startGoal.y+alt/8){

            TweenMax.to(start,.2,{y:alt/1.5,ease:Circ.easeIn});

        }
    };

    this.fadeOut=function(){

        stage.removeAllEventListeners();

        TweenMax.to(stage,1,{alpha:0,onComplete:Main.ponNivelNum,delay:.6});
        var instancia = createjs.Sound.play("espada");
    };

    this.ponNivelNum=function(num){

        stage.removeAllChildren();
        if(nivelNumText==null || nivelNumText==undefined){
            nivelNumText=new createjs.Text("",alt/12+"px Amarante","#ffffff");
            nivelNumText.x=10;
            nivelNumText.y=alt/2;
        }
        stage.alpha=1;
        nivelNumText.alpha=0;
        stage.addChild(nivelNumText);
        nivelNumText.text="Grid of Thrones\n\nEpisode "+nivell;
        TweenMax.to(nivelNumText,2,{alpha:1,onComplete:Main.quitaNivelNum});

    };

    this.quitaNivelNum=function(){
        TweenMax.to(nivelNumText,2,{alpha:0,onComplete:Main.fadeIn});


    };

    this.fadeIn=function(){
        stage.removeChild(nivelNumText);
        stage.alpha=0;
        TweenMax.killAll();

        Menu.pasarNivel();

    };

};



window.onload=Main.init();

window.onresize=function(){
    Main.windowResize();
};