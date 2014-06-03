/**
 User: alfonso
 Data: 17/03/14 , 10:29
 */

var funciones=[];


GamePlay=new function(){


    this.tic=function(){
        for(var i=0;i<funciones.length;i++){
            funciones[i]();
        }
      stage.update();
    };

    this.rearrange=function(){

        for(var i= 0;i<grid.length;i++){
            for (var j=0;j<grid[i].length;j++){
                grid[i][j].escut.x = margen+margen*(grid[i][j].col+1);
                grid[i][j].escut.y = margen+margen*(grid[i][j].fila+1);
            }
        }
    };

    this.move=function(){ ////////////////////////          T H E    M O T O R      /////////////////////////

        var linaje;

        if(TouchEvents.horizontal){
            if(movX<0){  /// hacia la izquierda
                var p=grid[0][pieza.fila];

                linaje=p.linaje;

                tablero.removeChild(p.escut);
                stage.addChild(p.escut);

                TweenMax.to(p.escut,.4,{x:lleoCastleArr[0].x});
                grid[0].splice(pieza.fila,1);// quito la ficha de la primera columna en el grid

                for(var i=0;i<numCols;i++){ // 2 times in normal mode
                    if(i==numCols-1){

                        Assets.sacaSuplente([i,pieza.fila]);
                    }else{
                        grid[i].splice(pieza.fila,0,grid[i+1].splice(pieza.fila,1)[0]);// quito el de la columna siguiente para ponerlo en la anterior
                        TweenMax.to(grid[i][pieza.fila].escut,0.4,{x:margen + margen*(i+1)});// desplazo
                        grid[i][pieza.fila].col--;
                    }
                }
                Assets.desvanece(linaje,"lleo", p.escut);


            }else{  /// hacia la derecha
                var p=grid[numCols-1][pieza.fila];
                linaje=p.linaje;

                tablero.removeChild(p.escut);
                stage.addChild(p.escut);

                TweenMax.to(p.escut,.4,{x:dracCastleArr[0].x});
                grid[numCols-1].splice(pieza.fila,1);// quito la ficha de la ultima columna en el grid

                for(var j=numCols-1;j>=0;j--){ // 2 times in normal mode
                    if(j==0){
                        Assets.sacaSuplente([j,pieza.fila]);
                    }else{
                        grid[j].splice(pieza.fila,0,grid[j-1].splice(pieza.fila,1)[0]);// quito el de la columna siguiente para ponerlo en la anterior
                        TweenMax.to(grid[j][pieza.fila].escut,0.4,{x:margen + margen*(j+1)});// desplazo
                        grid[j][pieza.fila].col++;
                    }
                }
                Assets.desvanece(linaje,"drac", p.escut);

            }
        }else{  ///////////// movimiento vertical
            if(movY<0){ ////////////////////// hacia arriba
                var p=grid[pieza.col][0];
                linaje=p.linaje;

                tablero.removeChild(p.escut);
                stage.addChild(p.escut);

                TweenMax.to(p.escut,0.4,{y:llopCastleArr[0].y});

                for(var k=1;k<numCols;k++){ // 3 ó 2 times in normal mode

                    TweenMax.to(grid[pieza.col][k].escut,0.4,{y:margen + margen*(k)});// desplazo
                    grid[pieza.col][k].fila--;
                }
                Assets.desvanece(linaje,"llop", p.escut);
                grid[pieza.col].splice(0,1);// quito la ficha de la primera fila en el grid

                Assets.sacaSuplente([pieza.col,numCols-1]);

            }else{//// hacia abajo
                var p=grid[pieza.col][numCols-1];
                linaje=p.linaje;

                tablero.removeChild(p.escut);
                stage.addChild(p.escut);
                TweenMax.to(p.escut,0.4,{y:corvCastleArr[0].y});


                for(var l=0; l<numCols-1; l++){ // 3 o dos  times in normal mode
                    TweenMax.to(grid[pieza.col][l].escut,0.4,{y:margen + margen*(l+2)});// desplazo
                    grid[pieza.col][l].fila++;
                }
                Assets.desvanece(linaje,"corv", p.escut);

                grid[pieza.col].splice(numCols-1,1);// quito la ficha de la ultima fila en el grid

                Assets.sacaSuplente([pieza.col,0]);// pongo el suplente en el hueco

            }
        }
    };




};
