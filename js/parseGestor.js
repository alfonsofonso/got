/**
 User: alfonso
 Data: 28/04/14 , 10:55
 */
////////////////////////////
//
    //    constructor: initParse() // AUTOMATICO si facebook login true!!
//
    //   setters:  setPuntos(punts)
//
    //   getters:  getDatosUsuario()   -->returns object: {nombreUsuario, puntuacionMax, fbID, amigos}
//
    //     borrar linea 130-134 (es solo para JOT)
//
////////////////////////////////////////////////////////////


    var gamers=[];
    var amigosParse;


var ParseGestor=new function(){


    var miQueryParse;
    var puntuacionMaxima=0;
    var nombreUsuario="yo";
    var fbID="";
    var amigos=[];
    var miObjetoParse;
    var amigosIDs=[];

    this.appID="VrxXoHtY992HRZsaFAAnRxH7r5gzBnN6tgM77mJj";
    this.jsID="S2KRwGIW2aWTsQttQiWDOpW2CLWPFzghBQesmKK1";


    // iniciar parse
    this.initParse=function(){//// solo si está conectado con FB
        console.log("inicio Parse");
        Parse.initialize(this.appID,this.jsID);
        var Puntuacion = Parse.Object.extend("Puntuacion");
        miObjetoParse = new Puntuacion();

        fbID=usuarioFB.id;
        nombreUsuario=usuarioFB.name;
        amigos=respuestaFB.data;

        ParseGestor.bajarMisDatos();
    };
    this.bajarMisDatos=function(){  // bajar mis datos de la nube
        if(fbID==""){console.log("bajarMisDatos imposible con facebookID null)");return}

        var Puntuacion = Parse.Object.extend("Puntuacion");
        var query = new Parse.Query(Puntuacion);
        query.equalTo("fbID",fbID);
        query.find({
            success: function(resp) {
                // The object was retrieved successfully.
                //console.log("query success:",resp)

                if(resp.length==0){//////////// si no tengo datos en Parse creo el objeto Parse
                    console.log("no estabas registrado en parse");
                    ParseGestor.setMisDatos();
                    return
                }
                //       si ya tengo datos en Parse, los guardo en variables de clase
                console.log("recupero los datos de la nube");
                miQueryParse=resp;
                miObjetoParse=miQueryParse[0];
                ParseGestor.checkForAmigosGamers();
            },
            error: function(object, error) {
               console.log("error en al recuperar datos:",error);
            }
        });
    };
    this.setMisDatos=function(){/// de las variables de clase al objeto

        miObjetoParse.set("fbID",fbID);
        miObjetoParse.set("puntuacionMax",puntuacionMaxima);
        miObjetoParse.set("nombreUsuario",nombreUsuario);
        miObjetoParse.set("amigos",amigos);
        miObjetoParse.save(null, {
            success: function(miObjetoParse) {
                // Execute any logic that should take place after the object is saved.
                console.log('guardado nuebo y bajado ' + miObjetoParse.id);
                ParseGestor.checkForAmigosGamers();
            },
            error: function(miObjetoParse, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and description.
                alert('Failed to create new object, with error code: ' + error.description);
            }
        });

    };


    // buscar amigos de facebook que juegan (FB.friends){ return array [jugadores][puntos]

    this.checkForAmigosGamers=function(){

        for(var i=0;i<amigos.length;i++){
            amigosIDs.push(amigos[i].id);
        }
        var Puntuacion = Parse.Object.extend("Puntuacion");
        var query = new Parse.Query(Puntuacion);
        query.containedIn("fbID",amigosIDs);

        query.find({
            success: function(resp) {
                // The object was retrieved successfully.
                console.log("friend query success:",resp)

                if(resp.length==0){//////////// si no tengo datos en Parse creo el objeto Parse
                    console.log("no tienes amigos que jueguen a esto");
                    return
                }
                //       si ya tengo datos en Parse, los guardo en variables de clase
                console.log("si que hay amigos");
                    amigosParse=resp;
                for(var i=0;i<amigosParse.length;i++){
                    var arr=[];
                    arr.push(amigosParse[i].get("fbID"));
                    arr.push(amigosParse[i].get("nombreUsuario"));
                    arr.push(amigosParse[i].get("puntuacionMax"));
                    gamers.push(arr);
                }
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                if(stage.children.indexOf(fondoChampions)!=-1){//////////////////////////////////////////////     solo para Grid of tHrones!!!!

                    Champions.ponChampions();
                }/// es para que cuando haces fb login desde hallOfFame, éste se refresque
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            },
            error: function(object, error) {
                console.log("error en al recuperar datos:",error);
            }
        });
    };



    //////////////////////////     S E T T E R S   ( e n   l o c a l )
    //////////////////////////////////////////////////////////////////////////////

    this.setPuntos=function(punts){

        miObjetoParse.set("puntuacionMax",punts);
        miObjetoParse.save();

    };


                           ///// G e t t e r s  ?   (en local)
    ///////////////////////////////////////////////////////////////////////////////

    this.getMisDatos=function(){ //auto, after query

        var obj = {
            "nombreUsuario":miObjetoParse.get("nombreUsuario"),
            "puntos":miObjetoParse.get("puntuacionMax"),
            "fbID":miObjetoParse.get("fbID"),
            "amigos":miObjetoParse.get("amigos")
        };
        return obj
    }








};