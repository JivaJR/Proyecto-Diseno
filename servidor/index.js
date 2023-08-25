import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import dgram from 'dgram'

const socket = dgram.createSocket('udp4');
const app = express();
app.use(cors())

export const conexion = mysql.createConnection({
    host : "localhost",
    database : "disenoelectronico",
    user : "root",
    password : ""
});

conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('BD Conectada exitosamente');
});

app.get('/',(req,res) =>{
    res.send('Inicio servidor')
})

// app.get('/enviar',(req,res) => {
//     var today = new Date();
//     var fecha = today.toLocaleDateString('it-IT');
//     var fecha = fecha.split('/').reverse().join('-');
//     var time = today.toLocaleTimeString('it-IT');
//     let lat = ("11"+"."+"0"+"0"+(Math.floor(Math.random() * (200000))));
//     let lon = ('-70'+"."+(Math.floor(Math.random() * (400000))));
//     let tabledb = 'gpsposition';
//     var sqlpet=`INSERT INTO ${tabledb} (IdEnvio, Fecha, Longitud, Latitud, Hora) VALUES (NULL,STR_TO_DATE('${fecha}','%Y-%m-%d'),${lon},${lat},STR_TO_DATE('${time}','%H:%i:%s'));`;
//     conexion.query(sqlpet, (err) => {
//         if (!err) {
//         console.log('Base de datos modificada exitosamente')
//         } else {
//         console.log(err);
//         }
//     })
//     res.redirect('./')
// })

app.get('/recibir',(req,res) => {
    let tabledb = 'gpsposition';
    var sqlpetget = `SELECT * from ${tabledb} WHERE IdEnvio = (SELECT MAX(IdEnvio ) FROM ${tabledb});`;
    conexion.query(sqlpetget, (err, mess, fields) => {
        res.status(200).json({
            data: mess,
        });
    });
})

app.get('/consultas',(req,res) => {
    var {inicial,final} = req.query;
    console.log(inicial,final)
        let tabledb = 'gpsposition';

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
    // }
})

socket.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    msg=msg.toString()
    const datos = msg.split(' || ');
    console.log(datos)
    let tabledb = 'gpsposition';
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

socket.bind(8080);

app.set('port',process.env.PORT || 8080)
app.use(express.json());
app.use(express.static('src'))
app.listen(app.get('port'), ()=>{
    console.log("Alojado en el puerto:",app.get('port'))
})

