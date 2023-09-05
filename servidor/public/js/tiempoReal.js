const idEnvio = document.getElementById('idEnvio'); 
const fecha = document.getElementById('fecha'); 
const hora = document.getElementById('hora');
const long = document.getElementById('long');
const lat = document.getElementById('lat'); 

async function Taxi() {
    //Fetch para obtener el ultimo dato de la base de datos
    // var response1 = await fetch('http://localhost:8050/recibir')
    await fetch('http://localhost:8080/recibir')
        .then(response => response.json())
        .then(data => {
            let idtaxi = data.data[0].IdEnvio;
            let lattxt = data.data[0].Longitud;
            let lontxt = data.data[0].Latitud
            let datetxt = data.data[0].Fecha.split('T')[0];
            let horatxt = data.data[0].Hora
            idEnvio.innerHTML=idtaxi;
            fecha.innerHTML=datetxt;
            hora.innerHTML=horatxt; 
            long.innerHTML=lontxt;
            lat.innerHTML=lattxt
            console.log(idtaxi)
        })
}setInterval("Taxi()", 5000)
Taxi()
