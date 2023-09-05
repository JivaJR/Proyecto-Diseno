import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import dgram from 'dgram'

const socket = dgram.createSocket('udp4');
const app = express();
app.use(cors())

// export const conexion = mysql.createConnection({
//     host : "localhost",
//     database : "disenoelectronico",
//     user : "root",
//     password : ""
// });

// conexion.connect(function(err) {
//     if (err) {
//         console.error('Error de conexion: ' + err.stack);
//         return;
//     }
//     console.log('BD Conectada exitosamente');
// });

app.get('/',(req,res) =>{
    res.send('Inicio servidor')
})

app.get('/recibir',(req,res) => {
    // let tabledb = 'gpsposition';
    // var sqlpetget = `SELECT * from ${tabledb} WHERE IdEnvio = (SELECT MAX(IdEnvio ) FROM ${tabledb});`;
    // conexion.query(sqlpetget, (err, mess, fields) => {
        res.status(200).json({
            "data": [
                {
                "IdEnvio": 408,
                "Fecha": "2023-09-02T05:00:00.000Z",
                "Longitud": -73.97964969277382,
                "Latitud": 40.730549025972806,
                "Hora": "09:08:09"
                }
                ]
        });
    // });
})

socket.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    // msg=msg.toString()
    // const datos = msg.split(' || ');
    // console.log(datos)
    // let tabledb = 'gpsposition';
    // var time = datos[1]
    // var fecha = datos[0]
    // var lon = datos[3]
    // var lat = datos[2]
    // var sqlpet=`INSERT INTO ${tabledb} (IdEnvio, Fecha, Longitud, Latitud, Hora) VALUES (NULL,STR_TO_DATE('${fecha}','%Y-%m-%d'),${lon},${lat},STR_TO_DATE('${time}','%H:%i:%s'));`;
    // conexion.query(sqlpet, (err) => {
    //     if (!err) {
    //     console.log('Base de datos modificada exitosamente desde udp')
    //     } else {
    //     console.log(err);
    //     }
    // })
});

socket.bind(8050);

app.set('port',process.env.PORT || 8050)
app.use(express.json());
app.use(express.static('src'))
app.listen(app.get('port'), ()=>{
    console.log("Alojado en el puerto:",app.get('port'))
})

