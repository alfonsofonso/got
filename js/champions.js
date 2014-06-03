var fbLogin;
var back;
var headScores;
var hallOfFame;

var miScore;
var fbRecommend;
var gamerso;

var Champions=new function(){


    this.ponChampions=function(){
        console.log("ponChampions");
        if(fbLogin==null || fbLogin==undefined){////////////////////   pongo boton FB
            fbLogin=new createjs.Bitmap(imatges["fbLogin"]);
            fbLogin.on("click",Champions.login);
        }
        fbLogin.x=amp/1.5;
        fbLogin.y=alt-fbLogin.getTransformedBounds().height-10;
        stage.addChild(fbLogin);

        if(back==null || back==undefined){//////////////////////////////    boton Back
            back=new createjs.Bitmap(imatges["back"]);
            back.on("click",Champions.back);
        }
        back.x=20;
        back.y=alt-back.getTransformedBounds().height-10;
        stage.addChild(back);

        if(headScores==undefined || headScores==null){///////////////////////////////////    titulo tabla
             headScores=new createjs.Text("level: "+nivell-1,alt/12+"px Amarante","#dddddd");
        }
        headScores.text="   Hall of Fame";
        headScores.x=20;
        headScores.y=20;
        stage.addChild(headScores);

        if(hallOfFame==null || hallOfFame==undefined){///////////////////////////////   tabla scores
            hallOfFame=new createjs.Container();
        }
        if(usuarioFB==undefined){usuarioFB={id:"000",name:" - You"}}
        miScore=new createjs.Text("level "+nivell-1+" - "+usuarioFB.name+"\n \n(login with facebook)",alt/20+"px Amarante","#dddddd");
        hallOfFame.removeAllChildren();

        if(socialStatus!="authorized"){
            fbRecommend=new createjs.Text("\n \n \n(login with facebook to\nsee your friends' level\nand save your score)",alt/20+"px Amarante","#dddddd");
            hallOfFame.addChild(fbRecommend);
        }else{
            hallOfFame.removeChild(fbRecommend);
        }


        if(usuarioFB.id!="000"){
            if(nivell-1>ParseGestor.getMisDatos().puntos){
                ParseGestor.setPuntos(nivell-1);
            }
            miScore.text="level "+ParseGestor.getMisDatos().puntos+" - "+usuarioFB.name;
        }



        hallOfFame.x=20;
        hallOfFame.y=headScores.getTransformedBounds().height+60;
        stage.addChild(hallOfFame);

        gamerso=[];

        for(var j=0;j<gamers.length;j++){
            gamerso.push(gamers[j]);
        }

        var miScoreArr=[usuarioFB.id,usuarioFB.name,nivell-1];
        gamerso.push(miScoreArr);

        gamerso.sort(function (a, b) {
            if (a[2] > b[2])
                return -1;
            if (a[2] < b[2])
                return 1;
            // a must be equal to b
            return 0;
        });

        for(var i=0;i<gamerso.length;i++){
            var scor=new createjs.Text("level "+gamerso[i][2]+" - "+gamerso[i][1],alt/20+"px Amarante","#dddddd");
            scor.y=alt/20*(i+1)+20;
            hallOfFame.addChild(scor);
        }

    };



    this.login=function(){
        console.log("login");
        if(socialStatus!="authorized"){
            SocialConnect.login();
            hallOfFame.removeChild(fbRecommend);
        }else{
            console.log("ya estas autorizado");
          //  SocialConnect.getUsuario();
          //  SocialConnect.getAmigos();/////////////////////////////////////////////     AQUI
        }
    };

    this.back=function(){
        console.log("back");
        stage.removeChild(back);
        stage.removeChild(fbLogin);
        stage.removeChild(headScores);
        stage.removeChild(hallOfFame);

        stage.removeChild(fondoChampions);
        //stage.removeC

        if(!stage.hasEventListener("mousedown")){
            stage.on("mousedown",TouchEvents.mouseDownHandler);
        }
    };


};