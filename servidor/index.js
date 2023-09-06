import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import dgram from 'dgram'

//ole

const socket = dgram.createSocket('udp4');
const app = express();
app.use(cors())

export const conexion = mysql.createConnection({
    host : "diseno-db.cfblivji1aj6.us-east-1.rds.amazonaws.com",
    database : "disenodb",
    user : "admin",
    password : "DisenodbAndrea123"
});

conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('BD Conectada exitosamente');
});

app.get('/',(req,res) =>{
    res.send('Inicio serviddor')
})

app.get('/recibir',(req,res) => {
    let database = 'disenodb';
    let tabledb = 'gpspostion';
    var sqlpetget = `SELECT * FROM ${database}.${tabledb} WHERE IdEnvio = (SELECT MAX(IdEnvio ) FROM ${database}.${tabledb});`;
    conexion.query(sqlpetget, (err, mess, fields) => {
        res.status(200).json({
            data:mess,
        });
    });
})

socket.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    msg=msg.toString()
    const datos = msg.split(' || ');
    console.log(datos)
    let database = 'disenodb';
    let tabledb = 'gpspostion';
    var time = datos[1]
    var fecha = datos[0]
    var lon = datos[3]
    var lat = datos[2]
    var sqlpet=`INSERT INTO ${database}.${tabledb} (IdEnvio, Fecha, Longitud, Latitud, Hora) VALUES (NULL,STR_TO_DATE('${fecha}','%Y-%m-%d'),${lon},${lat},STR_TO_DATE('${time}','%H:%i:%s'));`;
    conexion.query(sqlpet, (err) => {
        if (!err) {
        console.log('Base de datos modificada exitosamente desde udp')
        } else {
        console.log(err);
        }
    })
});

socket.bind(8050);

app.set('port',process.env.PORT || 8050)
app.use(express.json());
app.use(express.static('src'))
app.listen(app.get('port'), '0.0.0.0' ,()=>{
    console.log("Alojado en el puerto:",app.get('port'))
})

