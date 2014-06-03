/**
 User: alfonso
 Data: 13/03/14 , 10:46
 */

var llop;
var lleo;
var corv;
var drac;
var pop;

var llopGrey,lleoGrey,corvGrey,dracGrey;

var fondo;
var margen;
//var llopCastle,lleoCastle,corvCastle,dracCastle;
var llopCastleArr=[];
var lleoCastleArr=[];
var corvCastleArr=[];
var dracCastleArr=[];

var castV1,castV2,castH1,castH2;

var level1quin=0;

var fuenteSize=50;

var fichas=["llop","lleo","corv","drac","pop"];
var stateCastles={llop:0,lleo:0,corv:0,drac:0,pop:0};
var suplenteOb, sup2,supOb;
var tablero;
var suplente;

var matrix;
var redMatrix;
var filter;
var filter2;

var numWin=0;
var numCols=3;
var numEscudos=4;
var cup;
var viola;

Assets=new function(){

    this.ponLasBases=function(){

        if(corv==undefined || corv==null){
            corv= new createjs.Bitmap(imatges['corv']);
            corv.regX=corv.regY=150;
        }
        if(drac==undefined || drac==null){
            drac= new createjs.Bitmap(imatges['drac']);
            drac.regX=drac.regY=150;

        }
        if(lleo==undefined || lleo==null){
            lleo= new createjs.Bitmap(imatges['lleo']);
            lleo.regX=lleo.regY=150;
        }
        if(llop==undefined || llop==null){
            llop= new createjs.Bitmap(imatges['llop']);
            llop.regX=llop.regY=150;

        }
        if(pop==undefined || pop==null){
            pop= new createjs.Bitmap(imatges['pop']);
            pop.regX=pop.regY=150;

        }

        if(llopGrey==undefined || llopGrey==null){
            llopGrey=new createjs.Bitmap(imatges["llopGrey"]);
            llopGrey.regX=llopGrey.regY=150;
        }
        if(lleoGrey==undefined || lleoGrey==null){
            lleoGrey=new createjs.Bitmap(imatges["lleoGrey"]);
            lleoGrey.regX=lleoGrey.regY=150;
        }
        if(corvGrey==undefined || corvGrey==null){
            corvGrey=new createjs.Bitmap(imatges["corvGrey"]);
            corvGrey.regX=corvGrey.regY=150;
        }
        if(dracGrey==undefined || dracGrey==null){
            dracGrey=new createjs.Bitmap(imatges["dracGrey"]);
            dracGrey.regX=dracGrey.regY=150;
        }

        if(tablero==null&&tablero==undefined){
            tablero=new createjs.Container();
        }
    };

    this.creaGrid=function(filas){


        margen=amp/(filas+3);

        for (var i=0;i<filas;i++){
            var column=[];
            for (var j=0;j<filas;j++){
                var fig={};
                fig.fila=j;
                fig.col=i;
                var q=Math.floor(Math.random()*numEscudos);
                fig.linaje=fichas[q];
                tablero.addChild(fig.escut=Assets.dameEscudo(q));
                fig.escut.scaleX=fig.escut.scaleY= margen/300; // la anchura de la imagen

                fig.escut.x= margen + margen * (fig.col+1);
                fig.escut.y= margen + margen * (fig.fila+1);
                //fig.escut.addEventListener("mousedown",function(){TouchEvents.mouseDownHandler(fig)});
                column.push(fig);
            }
            grid.push(column);

        }
        stage.addChild(tablero);
        Assets.ponFB();
        Assets.ponViola();
    };

    this.creaCastles=function(){

        console.log("CreaCastles");

        for(var i=0;i<numWin;i++){/// i = número de pila

            Assets.posaLleons(i);
            Assets.posaLlops(i);
            Assets.posaCorvs(i);
            Assets.posaDracs(i);
        }
    };


    this.dameEscudo=function(quin){


        if(quin==undefined || quin==null){
            var cual =Math.floor(Math.random()*numEscudos);

        }else{
            var cual=quin;
        }

        var cont=new createjs.Container();

        if(cual==0){
            var l=llop.clone();// llop = 0
            cont.addChild(l);
        }else if(cual==1){ ///// lleo = 1
            var e=lleo.clone();
            cont.addChild(e);
        }else if(cual==2){      // corv = 2
            var c=corv.clone();
            cont.addChild(c);
        }else if(cual==3){                  // drac = 3
            var d=drac.clone();
            cont.addChild(d);
        }else if(cual==4){
            var e=pop.clone();
            cont.addChild(e);
        }else{
            console.log("problem")
        }
        return cont;
    };

    this.calientaSuplente=function(){// genera y pon en el fondo


        if(numWin==1){
            var q=level1quin;
            level1quin++;
            if(level1quin>3){
                level1quin=0;
            }
            suplente=Assets.dameEscudo(q);
        }else{
            var q=Math.floor(Math.random()*numEscudos);
            suplente=Assets.dameEscudo(q);
        }

        suplente.x=suplente.y=margen*((numCols+3)/2);
        suplente.scaleX=suplente.scaleY=10;//numCols*2;

        var scale=(margen*(numCols+3))/suplente.children[0].image.width;
        suplente.alpha=0;
        suplente.mouseEnabled=false;

        suplenteOb={};
        suplenteOb.linaje=fichas[q];
        suplenteOb.escut=suplente;
       // suplenteOb.escut=Assets.suplente;

        tablero.addChild(suplente);

        TweenMax.to(suplente,.4,{alpha:.3,ease:Quint.easeIn,scaleX:scale,scaleY:scale,onComplete:Assets.tambaleaSuplente});

        if(!stage.hasEventListener("mousedown")){
            stage.addEventListener("mousedown",TouchEvents.mouseDownHandler);
        }
    };
    this.tambaleaSuplente=function(){

        TweenMax.to(suplente,3,{repeat:-1,scaleX:-suplente.scaleX,yoyo:true,ease:Quad.easeInOut});

    };


    this.sacaSuplente=function(donde){// del fondo pasa a su posición //   donde= una array con dos elementos_ col i fila

        var fig=suplenteOb;

        fig.fila=donde[1];
        fig.col=donde[0];

        fig.linaje=suplenteOb.linaje;
        fig.escut.mouseEnabled=true;

        grid[donde[0]].splice(donde[1],0,fig);// poner fig en grid
        TweenMax.killTweensOf(suplente);
        TweenMax.to(suplente,.3,{alpha:1,scaleX:margen/300,scaleY:margen/300,x:margen + margen * (fig.col+1),y:margen + margen * (fig.fila+1),ease:Power3.easeIn});
            //return(fig)
    };

    this.desvanece=function(escu,cast,q){
        counter++;
        console.log(escu,cast,"-------desvanece");
        if(escu==cast){
            TweenMax.to(q,.8,{alpha:0,delay:.4,onComplete:function(){stage.removeChild(q)}});
            setTimeout(function(){Assets.CastilloBien(cast,q)},400);
        }else{

            TweenMax.to(q,.8,{alpha:0,scaleX:margen/150,scaleY:margen/150,delay:.4,onComplete:function(){stage.removeChild(q)}});
            setTimeout(function(){Assets.CastilloMal(cast)},400);
        }

    };


                                                ////////////////   c a s t i l l o s    /////////////
    this.CastilloBien=function(qu,p){
        if(qu=="drac"){

            stateCastles.drac++;
            if (numWin-stateCastles.drac<1){///si llega a numMin (level)
                stage.removeChild(dracCastleArr[0]);
                castV2.alpha=1;
                TweenMax.killTweensOf(p);
                TweenMax.to(p,1,{x:castV2.x+castV2.getTransformedBounds().width/2,y:castV2.y+castV2.getTransformedBounds().height/2});

            }else{//////////// si aún no llega a numMin

                stage.removeChild(dracCastleArr[dracCastleArr.length-1]);
                dracCastleArr.splice(dracCastleArr.length-1,1);
            }

        }else if(qu=="llop"){

            stateCastles.llop++;
            if (numWin-stateCastles.llop<1){
                stage.removeChild(llopCastleArr[0]);
                castH1.alpha=1;
                TweenMax.killTweensOf(p);
                TweenMax.to(p,1,{x:castH1.x+castH1.getTransformedBounds().width/2,y:castH1.y+castH1.getTransformedBounds().height/2});
            }else{
                stage.removeChild(llopCastleArr[llopCastleArr.length-1]);
                llopCastleArr.splice(llopCastleArr.length-1,1);
            }

        }else if(qu=="lleo"){

            stateCastles.lleo++;
            if(numWin-stateCastles.lleo<1){
                stage.removeChild(lleoCastleArr[0]);
                castV1.alpha=1;
                TweenMax.killTweensOf(p);
                TweenMax.to(p,1,{x:castV1.x+castV1.getTransformedBounds().width/2,y:castV1.y+castV1.getTransformedBounds().height/2});
            }else{
                stage.removeChild(lleoCastleArr[lleoCastleArr.length-1]);
                lleoCastleArr.splice(lleoCastleArr.length-1,1);
            }

        }else if(qu=="corv"){

            stateCastles.corv++;
            if(numWin-stateCastles.corv<1){
                stage.removeChild(corvCastleArr[0]);
                castH2.alpha=1;
                TweenMax.killTweensOf(p);
                TweenMax.to(p,1,{x:castH2.x+castH2.getTransformedBounds().width/2,y:castH2.y+castH2.getTransformedBounds().height/2});

            }else{
                stage.removeChild(corvCastleArr[corvCastleArr.length-1]);
                corvCastleArr.splice(corvCastleArr.length-1,1);
            }

        }else{
            console.log("problemo");
        }
        Assets.comprueba();
    };


    this.CastilloMal=function(qu){///////////////////////////  M A L
        var instance = createjs.Sound.play("machet");
        if(qu=="llop"){
            for(var i2=1;i2<llopCastleArr.length;i2++){
                stage.removeChild(llopCastleArr[i2]);
            }
            llopCastleArr[0].alpha=.6;
            llopCastleArr[0].cache(0,0,300,300);
            llopCastleArr.splice(1);
            stateCastles.llop=0;
            for(var i=1;i<numWin;i++){
                Assets.posaLlops(i);
            }
            castH1.alpha=.6;
        }else if(qu=="lleo"){
            for(var j2=1;j2<lleoCastleArr.length;j2++){
                stage.removeChild(lleoCastleArr[j2]);
            }
            lleoCastleArr[0].alpha=.6;
            lleoCastleArr[0].cache(0,0,300,300);
            lleoCastleArr.splice(1);
            stateCastles.lleo=0;
            for(var j=1;j<numWin;j++){
                Assets.posaLleons(j);
            }
            castV1.alpha=.6;
        }else if(qu=="corv"){
            for(var k2=1;k2<corvCastleArr.length;k2++){
                stage.removeChild(corvCastleArr[k2]);
            }
            corvCastleArr[0].alpha=.6;
            corvCastleArr[0].cache(0,0,300,300);
            corvCastleArr.splice(1);
            stateCastles.corv=0;
            for(var k=1;k<numWin;k++){
                Assets.posaCorvs(k);
            }
            castH2.alpha=.6;
        }else if(qu=="drac"){
            for(var l2=1;l2<dracCastleArr.length;l2++){
                stage.removeChild(dracCastleArr[l2]);
            }
            dracCastleArr[0].alpha=.6;
            dracCastleArr[0].cache(0,0,300,300);
            dracCastleArr.splice(1);
            stateCastles.drac=0;
            for(var l=1;l<numWin;l++){
                Assets.posaDracs(l);
            }
            castV2.alpha=.6;

        }else{
            console.log("problemo");
        }
        console.log(stateCastles);
    };


    this.comprueba=function(){
        if(stateCastles.lleo>=numWin && stateCastles.llop>=numWin && stateCastles.corv>=numWin && stateCastles.drac>=numWin) {
            var instance = createjs.Sound.play("espada");
            Main.fadeOut();
        }
        console.log(stateCastles);
    };

    this.posaCastles=function(){
        if(castV1==undefined||castV1==null){
            castV1=new createjs.Bitmap(imatges["castV"]);
         //   castV1.scaleX=castV1.scaleY=margen/160;
        }
        castV1.alpha=.6;
        castV1.x=10;castV1.y=margen*1.5;
        stage.addChild(castV1);

        if(castV2==undefined||castV2==null){
            castV2=new createjs.Bitmap(imatges["castV"]);
          //  castV2.scaleX=castV2.scaleY=margen/160;
        }
        castV2.alpha=.6;
        castV2.x=margen*4.6;castV2.y=margen*1.5;
        stage.addChild(castV2);

        if(castH1==undefined||castH1==null){
            castH1=new createjs.Bitmap(imatges["castH"]);
            //castH1.scaleX=castH1.scaleY=margen/160;
        }
        castH1.alpha=.6;
        castH1.x=margen*1.36;castH1.y=10;
        stage.addChild(castH1);

        if(castH2==undefined||castH2==null){
            castH2=new createjs.Bitmap(imatges["castH"]);
         //   castH2.scaleX=castH2.scaleY=margen/160;
        }
        castH2.alpha=.6;
        castH2.x=margen*1.36;castH2.y=margen*4.6;
        stage.addChild(castH2);
    };

    this.posaLlops=function(i){
        var llopCastle = llopGrey.clone();

        llopCastle.scaleX=llopCastle.scaleY=margen/400;
        llopCastle.regX=llopCastle.regY=150;
        stage.addChild(llopCastle);
        llopCastle.cache(0, 0,300,300);
        llopCastle.x=amp/2.9+i*130;//////////////////////////  the difference
        llopCastle.y=margen/2+30;
        console.log(llopCastleArr.push(llopCastle),"pusheo llopCastle en llopCastleARr");
    };

    this.posaLleons=function(i){

        var lleoCastle = lleoGrey.clone();

        lleoCastle.scaleX=lleoCastle.scaleY=margen/400;
        lleoCastle.regX=lleoCastle.regY=150;
        stage.addChild(lleoCastle);
        lleoCastle.cache(0, 0,300,300);
        lleoCastle.x=margen/1.9+30;
        lleoCastle.y=margen*(numCols+3)/2.8 + i*120;/////////////////////  the difference
        lleoCastleArr.push(lleoCastle);


    };

    this.posaCorvs=function(i){
        var corvCastle = corvGrey.clone();

        corvCastle.scaleX=corvCastle.scaleY=margen/400;
        corvCastle.regX=corvCastle.regY=150;
        stage.addChild(corvCastle);
        corvCastle.cache(0, 0,300,300);
        corvCastle.x=amp/2.9 +i*130;///////////////////////////  the difference
        corvCastle.y=margen*(numCols+2)+40;
        corvCastleArr.push(corvCastle);

    };

    this.posaDracs=function(i){
        var dracCastle = dracGrey.clone();

        dracCastle.scaleX=dracCastle.scaleY=margen/400;
        dracCastle.regX=dracCastle.regY=150;
        stage.addChild(dracCastle);
        dracCastle.cache(0, 0,300,300);
        dracCastle.x=amp-margen+30;
        dracCastle.y=margen*(numCols+3)/2.8 + i*120;//////////////////  the difference
        dracCastleArr.push(dracCastle);
    };

    this.posaPops=function(i){
        var popCastle = pop.clone();

        popCastle.scaleX=dracCastle.scaleY=margen/400;
        popCastle.regX=dracCastle.regY=150;
        stage.addChild(popCastle);
        popCastle.cache(0, 0,300,300);
        popCastle.x=amp-margen+20;
        popCastle.y=margen*(numCols+3)/3.5 + i*100;//////////////////  the difference
        dracCastleArr.push(popCastle);
    };


    this.ponFB=function(){

        if(cup==null || cup==undefined){
            cup=new createjs.Bitmap(imatges["cup"]);
            cup.on("click",TouchEvents.champions);
            cup.x=amp-cup.getTransformedBounds().width-10;
            cup.y=alt-cup.getTransformedBounds().height-10;
        }
        stage.addChild(cup);

    };

    this.ponViola=function(){

        if(viola==null || viola==undefined){
            viola=new createjs.Bitmap(imatges["viola"]);
            viola.on("click",TouchEvents.switchMute);
            viola.x=10;
            viola.y=alt-viola.getTransformedBounds().height-10;
        }
        stage.addChild(viola);

    };


};