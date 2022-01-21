const Tarea = require("./tarea");
require('colors');
class Tareas{

    _listado = {};

    get listadoArr(){
        const listado = [];
        //metodo que permite extraer las las llaven que se encuentren dentro de un arreglo
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });
        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea( id = '' ){
        if( this._listado[id] ){
            delete this._listado[id];
        }
    }


    cargarTareasFromArray( tareas = [] ){
        tareas.forEach(tarea=>{
            this._listado[tarea.id] = tarea;
        })
    }


    crearTarea( desc = '' ){
        const tarea = new Tarea( desc );
        this._listado[tarea.id]= tarea;
    }


    //forma de resolver la tarea de darle formato a las impresiones del curso
    listadoCompleto(){

        console.log();
        this.listadoArr.forEach( (tarea,i)=>{
            const idx = `${i+1}`.green;
            const {desc, completadoEn}=tarea;
            const estado = ( completadoEn )
                                ? (completadoEn+'').green
                                : 'Pendiente'.red;
            console.log(`${ idx } ${ desc } :: ${estado}\n`);
        })
    }


    listarPendientesCompletadas( completadas = true){
        console.log();
        let contador = 0;
        this.listadoArr.forEach( (tarea)=>{
            const {desc, completadoEn}=tarea;
            const estado  =( completadoEn )
                                ? (completadoEn+'').green
                                : 'Pendiente'.red
            if(completadas ){
                if(completadoEn){
                    contador +=1;
                    console.log(`${ (contador+'.').green  } ${ desc } :: ${ estado }\n`);
                }
            }else{
                if(!completadoEn){
                    contador +=1;
                    console.log(`${ (contador+'.').green  } ${ desc } :: ${ estado }\n`)
                }
            }
        })
    }

    toggleCompletadas ( ids = [] ){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if ( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach( tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports =  Tareas;

//mi forma de resolver la tarea de darle formato a las impresiones e imprimir tareas compeltadas y pendientes

/*listadoCompleto(){
    let i=1;
    console.log('\n');
    Object.keys(this._listado).forEach(key=>{
        const tarea = this._listado[key];
        if(tarea.completadoEn===null){
            console.log(`${colors.green(i)} ${tarea.desc} :: ${'pendiente'.red}\n`);
        }else{
            console.log(`${colors.green(i)} ${tarea.desc} :: ${'Completado'.green}\n`);

        }
        i++;
    })
}
    listarPendientesCompletadas( completadas = true){
        console.log();
        let i=1;
        this.listadoArr.forEach( (tarea)=>{
            const {desc, completadoEn}=tarea;
            if(completadas ){
                if(completadoEn){
                    console.log(`${ colors.green(i)  } ${ desc } :: ${'Completada'.green}\n`);
                    i++
                }
            }else{
                if(!completadoEn){
                    console.log(`${ colors.green(i)  } ${ desc } :: ${'Pendiente'.red}\n`)
                    i++
                }
            }
        })
    }

*/