
var preload;
var manifest;
var imatges= [];

var NUM_IMATGES = 16 ;
var NUM_AUDIOS=4;
var loaded_imatges = 0;

var loading;


Loader = new function() {

    this.cargaAssets = function (){

        Loader.loadSound();
        Loader.ponLoading();
        //Loader.reload();
    };

    this.ponLoading=function(){

        if(loading==null || loading== undefined ){
            loading=new createjs.Bitmap("img/rotary.png");
            loading.regX=loading.regY=100;
            loading.x=amp/2;
            loading.y=alt/2;
        }
        stage.addChild(loading);

    };

    this.loadSound = function(){
        if (!createjs.Sound.initializeDefaultPlugins()) {
            //loaded_imatges = NUM_AUDIOS;
            this.reload();
        }
        else
        {
            var assetsPath = "audio/";
            var manifestAudio = [
                {src:assetsPath+"gridOfThrones.mp3|"+assetsPath+"gridOfThrones.ogg|"+assetsPath+"gridOfThrones.m4a", id:'COT'},
                {src:assetsPath+"knife.mp3|"+assetsPath+"knife.ogg|"+assetsPath+"knife.m4a", id:'knife'},
                {src:assetsPath+"machet.mp3|"+assetsPath+"machet.ogg|"+assetsPath+"machet.m4a", id:'machet'},
                {src:assetsPath+"espada.mp3|"+assetsPath+"espada.ogg|"+assetsPath+"espada.m4a", id:'espada'}
            ];

            createjs.Sound.addEventListener("fileload", createjs.proxy(Loader.soundLoaded, Loader)); // add an event listener for when load is completed
            createjs.Sound.registerManifest(manifestAudio);
        }

    };

    this.soundLoaded = function()
    {
        loaded_imatges++;
        if(loaded_imatges == NUM_AUDIOS){
            loaded_imatges=0;
            
            this.reload();
        }
    };


    // Reset everything ---- load images
    this.reload = function () {
        // If there is an open preload queue, close it.
        if (preload != null){ preload.close(); }
        //
        // Push each item into our manifest
        manifest = [
            //entorn -- 1 imatge
            "corv.png",
            "leo.png",
            "wolf.png",
            "drac.png",
            "dit.png",
            "cup.png",
            "back.png",
            "fbLogin.png",
            "castH.png",
            "castV.png",
            "pop.png",
            "wolfGrey.png",
            "leoGrey.png",
            "corvGrey.png",
            "dracGrey.png",
            "viola.png"

        ];

        // Create a preloader. There is no manifest added to it up-front, we will add items on-demand.
        //if(RESOLUTION == 1) preload = new createjs.LoadQueue(true, "img_gran/");
        preload = new createjs.LoadQueue(false, "img/");
       // if(RESOLUTION == 4) preload = new createjs.LoadQueue(true, "img_petit/");

        // Use this instead to use tag loading
        //preload = new createjs.LoadQueue(false);
        preload.addEventListener("fileload", Loader.handleFileLoad);
        preload.addEventListener("progress", Loader.handleOverallProgress);
        preload.addEventListener("fileprogress", Loader.handleFileProgress);
        preload.addEventListener("error",Loader.handleFileError);
        preload.setMaxConnections(500);

        Loader.loadAll();
    };

    this.stop = function () {
        if (preload != null) { preload.close(); }
    };

    this.loadAll = function () {
      //  console.log("loaded images "+manifest.length);
        while (manifest.length > 0) {
            var item = manifest.shift();
            preload.loadFile(item);
            // If we have no more items, disable the UI.
            if (manifest.length == 0) {

            }
        }
    };


    // File complete handler
    this.handleFileLoad = function (event) {

        //console.log("Imatge: "+ event.item.src+" Pujada. ");
        loaded_imatges++;

        switch(event.item.src)
        {

            case "wolf.png": imatges['llop'] =  event.result;
                break
            case "leo.png": imatges['lleo'] =  event.result;
                break
            case "drac.png": imatges['drac'] =  event.result;
                break
            case "corv.png": imatges['corv'] =  event.result;
                //Loader.posaLoader();
                break;
            case "dit.png": imatges['dit'] =  event.result;
                break;
            case "cup.png": imatges['cup'] =  event.result;
                break;
            case "back.png": imatges['back'] =  event.result;
                break;
            case "fbLogin.png": imatges['fbLogin'] =  event.result;
                break;
            case "castH.png": imatges['castH'] =  event.result;
                break;
            case "castV.png": imatges['castV'] =  event.result;
                break;
            case "pop.png": imatges['pop'] =  event.result;
                break;
            case "wolfGrey.png": imatges['llopGrey'] =  event.result;
                break;
            case "leoGrey.png": imatges['lleoGrey'] =  event.result;
                break;
            case "corvGrey.png": imatges['corvGrey'] =  event.result;
                break;
            case "dracGrey.png": imatges['dracGrey'] =  event.result;
                break;
            case "viola.png": imatges['viola'] =  event.result;
                break;

        }

        //console.log("loaded",loaded_imatges,"num",NUM_IMATGES);
        if( loaded_imatges == NUM_IMATGES )
        {
           stage.removeChild(loading);
           Main.empezar();

        }

    };
    // File progress handler
    this.handleFileProgress = function (event) {
        console.log("Imatge: "+ event.item.src+" -  progres: ");//+ preload.progress );
    };

    // Overall progress handler
    this.handleOverallProgress = function (event) {
    //    percent.text = Math.floor(loaded_imatges*100/NUM_IMATGES)+"%";
       // stage.update();
    };
    // An error happened on a file
    this.handleFileError = function (event) {

        //alert("error"+event.message);
        Loader.cargaAssets();
        console.log("ERROR!!! = "+event.message);
    }


};//fin loader