import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import dgram from 'dgram'
import env from './env.js'

const socket = dgram.createSocket('udp4');
const app = express();
app.use(cors())

export const conexion = mysql.createConnection({
    host : env.HOST,
    database : env.DATABASE,
    user : env.USER,
    password : env.PASSWORD
});

conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('BD Conectada exitosamente');
});

//Pruebas
app.set('views', './views')
app.set('view engine', 'pug');
//Fin pruebas

app.get('/',(req,res) =>{
    let tabledb = env.TABLE;
    var sqlpetget = `SELECT * from ${tabledb} WHERE IdEnvio = (SELECT MAX(IdEnvio ) FROM ${tabledb});`;
    conexion.query(sqlpetget, (err, mess) => {
        res.status(200).json({
            data:mess
        })
    });
})

app.get('/recibir',(req,res) => {
    let tabledb = env.TABLE;
    var sqlpetget = `SELECT * from ${tabledb} WHERE IdEnvio = (SELECT MAX(IdEnvio ) FROM ${tabledb});`;
    conexion.query(sqlpetget, (err, mess) => {
        res.status(200).json({
            data: mess,
        });
    });
})

app.get('/consultas',(req,res) => {

    var {inicial,final} = req.query;
    console.log(inicial,final)
    let tabledb = env.TABLE;

    conexion.query(`SELECT * FROM ${tabledb} WHERE (Fecha BETWEEN '${inicial}' AND '${final}')`, (err, result) => {
        if (!err) {
            let info = result;
            let latlon = Array(0);
            let timeStamp = Array(0);
            for (var i=0;i<info.length;i++){
                latlon[i] = [info[i]['Latitud'],info[i]['Longitud']];
                timeStamp[i] = [info[i]['Fecha'],info[i]['Hora']];
            }
            res.status(200).json({
                data: latlon,
                time:timeStamp
            });
        }else {
            console.log(err);
        }
    })
})

socket.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    msg=msg.toString()
    const datos = msg.split(' || ');
    console.log(datos)
    let tabledb = env.TABLE;
    var time = datos[1]
    var fecha = datos[0]
    var lon = datos[3]
    var lat = datos[2]
    var sqlpet=`INSERT INTO ${tabledb} (IdEnvio, Fecha, Longitud, Latitud, Hora) VALUES (NULL,STR_TO_DATE('${fecha}','%Y-%m-%d'),${lon},${lat},STR_TO_DATE('${time}','%H:%i:%s'));`;
    conexion.query(sqlpet, (err) => {
        if (!err) {
        console.log('Base de datos modificada exitosamente desde udp')
        } else {
        console.log(err);
        }
    })
});

socket.bind(env.PORT);

app.use(express.static("./public"));
app.set('port',env.PORT)
app.use(express.json());
app.listen(app.get('port'), '0.0.0.0' ,()=>{
    console.log("Alojado en el puerto:",app.get('port'))
})

