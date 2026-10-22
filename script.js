// 🔔 Canal de notificaciones (coloca aquí exactamente el mismo nombre que pusiste en la app
const CANAL_NTFY = "didi_premier_clima_88"; // Reemplaza por el nombre exacto de tu canal

function enviarAlertaCelular(mensaje) {
  console.log("Intentando enviar alerta:", mensaje);

  fetch(`https://ntfy.sh/${CANAL_NTFY}`, {
    method: 'POST',
    body: mensaje,
    headers: {
      'Title': 'Clima DiDi Premier',
      'Priority': '4' // Prioridad alta
    }
  })
  .then(respuesta => {
    if (respuesta.ok) {
      console.log("✅ Notificación enviada con éxito a ntfy.sh");
    } else {
      console.error("❌ Error en la respuesta del servidor:", respuesta.status);
    }
  })
  .catch(error => {
    console.error("❌ Error de red al intentar enviar:", error);
  });
}


// 📺 Carrusel de imágenes
const imagenes = [
  "imagen_1",
];

let indiceActual = 0;
const elementoImagen = document.getElementById('imagen-carrusel');

setInterval(() => {
  indiceActual = (indiceActual + 1) % imagenes.length;
  if (elementoImagen) {
    elementoImagen.src = imagenes[indiceActual];
  }
}, 5000);

// 🌐 Sistema de Traducción e Idiomas
let idiomaActual = 'es';
let temporizadorIdioma;
const TREINTA_MINUTOS = 30 * 60 * 1000; // 1,800,000 milisegundos

const traducciones = {
  es: {
    wifiTitulo: "📶 Red Wi-Fi",
    labelRed: "Red:",
    labelClave: "Clave:",
    musicaTitulo: "🎵 Control de Música",
    btnSpotify: "Música en Spotify",
    climaTitulo: "🌡️ Clima del Auto",
    btnClimaBase: "Ajustar Clima",
    btnIdioma: "English 🇺🇸",
    idiomaTitulo: "🌐 Idioma",
    modalClimaTitulo: "🌡️ Selecciona la Temperatura",
    btnApagarAc: "❄️ Apagar AC",
    btnConfirmarAc: "✅ Confirmar",
    btnCancelar: "❌ Cancelar",
    modalSpotifyTitulo: "🎵 Control de Música",
    modalSpotifyDesc: "Escanea el código QR o presiona el botón para unirte al <strong>Spotify Jam</strong> del vehículo.",
    btnSpotifyLink: "🟢 Abrir Spotify Jam",
    btnVolver: "❌ Volver al inicio",
    apagado: "Apagado"
  },
  en: {
    wifiTitulo: "📶 Wi-Fi Network",
    labelRed: "Net:",
    labelClave: "Pass:",
    musicaTitulo: "🎵 Music Control",
    btnSpotify: "Music on Spotify",
    climaTitulo: "🌡️ Car Climate",
    btnClimaBase: "Adjust Climate",
    btnIdioma: "Español 🇲🇽",
    idiomaTitulo: "🌐 Language",
    modalClimaTitulo: "🌡️ Select Temperature",
    btnApagarAc: "❄️ Turn Off AC",
    btnConfirmarAc: "✅ Confirm",
    btnCancelar: "❌ Cancel",
    modalSpotifyTitulo: "🎵 Music Control",
    modalSpotifyDesc: "Scan the QR code or tap the button to join the vehicle's <strong>Spotify Jam</strong>.",
    btnSpotifyLink: "🟢 Open Spotify Jam",
    btnVolver: "❌ Back to start",
    apagado: "Off"
  }
};

function alternarIdioma() {
  idiomaActual = (idiomaActual === 'es') ? 'en' : 'es';
  aplicarTraducciones();

  clearTimeout(temporizadorIdioma);
  if (idiomaActual === 'en') {
    // Si se selecciona inglés, se programa el retorno a español en 30 minutos
    temporizadorIdioma = setTimeout(() => {
      idiomaActual = 'es';
      aplicarTraducciones();
    }, TREINTA_MINUTOS);
  }
}

function aplicarTraducciones() {
  const t = traducciones[idiomaActual];

  document.getElementById('txt-titulo-wifi').innerText = t.wifiTitulo;
  document.getElementById('txt-label-red').innerText = t.labelRed;
  document.getElementById('txt-label-clave').innerText = t.labelClave;
  
  document.getElementById('txt-titulo-musica').innerText = t.musicaTitulo;
  document.getElementById('txt-btn-spotify').innerText = t.btnSpotify;
  
  document.getElementById('txt-titulo-clima').innerText = t.climaTitulo;
  document.getElementById('txt-titulo-idioma').innerText = t.idiomaTitulo;
  document.getElementById('btn-cambiar-idioma').innerText = t.btnIdioma;

  document.getElementById('txt-modal-clima-titulo').innerText = t.modalClimaTitulo;
  document.getElementById('btn-apagar-ac').innerText = t.btnApagarAc;
  document.getElementById('btn-confirmar-ac').innerText = t.btnConfirmarAc;
  document.getElementById('btn-cancelar-clima').innerText = t.btnCancelar;

  document.getElementById('txt-modal-spotify-titulo').innerText = t.modalSpotifyTitulo;
  document.getElementById('txt-modal-spotify-desc').innerHTML = t.modalSpotifyDesc;
  document.getElementById('btn-abrir-spotify-link').innerText = t.btnSpotifyLink;
  document.getElementById('btn-cancelar-spotify').innerText = t.btnVolver;

  actualizarBotonClima();
}

let estadoClimaTexto = "22.0°C";

function actualizarBotonClima() {
  const t = traducciones[idiomaActual];
  const texto = (estadoClimaTexto === "Apagado" || estadoClimaTexto === "Off") ? t.apagado : estadoClimaTexto;
  document.getElementById('btn-abrir-clima').innerText = `${t.btnClimaBase} (${texto})`;
}

// 🌡️ Lógica Modal Clima (5 segundos de espera)
let temporizadorClima;

function abrirModalClima() {
  document.getElementById('modal-clima').classList.remove('oculto');
  reiniciarTemporizadorClima();
}

function cerrarModalClima() {
  document.getElementById('modal-clima').classList.add('oculto');
  clearTimeout(temporizadorClima);
}

function reiniciarTemporizadorClima() {
  clearTimeout(temporizadorClima);
  temporizadorClima = setTimeout(() => {
    cerrarModalClima();
  }, 5000);
}

function actualizarLecturaTemp(valor) {
  const numVal = parseFloat(valor);
  const display = document.getElementById('valor-temp');

  if (numVal === 32.0) {
    display.innerText = "HI (32.0°C)";
  } else if (numVal === 18.0) {
    display.innerText = "LO (18.0°C)";
  } else {
    display.innerText = `${numVal.toFixed(1)}°C`;
  }
  reiniciarTemporizadorClima();
}

function confirmarTemperatura() {
  const val = parseFloat(document.getElementById('range-temp').value);
  if (val === 32.0) estadoClimaTexto = "HI";
  else if (val === 18.0) estadoClimaTexto = "LO";
  else estadoClimaTexto = `${val.toFixed(1)}°C`;

  actualizarBotonClima();
  cerrarModalClima();

  // 🔔 Envía la alerta inmediata a tu teléfono
  enviarAlertaCelular(`El pasajero solicita: ${estadoClimaTexto}`);
}

function apagarClima() {
  estadoClimaTexto = traducciones[idiomaActual].apagado;
  actualizarBotonClima();
  cerrarModalClima();

  // 🔔 Envía la alerta de apagado a tu teléfono
  enviarAlertaCelular("El pasajero solicita: APAGAR el aire acondicionado");
}


// 🎵 Lógica Modal Spotify Jam (2 minutos de espera)
let temporizadorSpotify;

function abrirModalSpotify() {
  document.getElementById('modal-spotify').classList.remove('oculto');
  reiniciarTemporizadorSpotify();
}

function cerrarModalSpotify() {
  document.getElementById('modal-spotify').classList.add('oculto');
  clearTimeout(temporizadorSpotify);
}

function reiniciarTemporizadorSpotify() {
  clearTimeout(temporizadorSpotify);
  temporizadorSpotify = setTimeout(() => {
    cerrarModalSpotify();
  }, 120000); // 2 minutos
}

function abrirEnlaceSpotify() {
  window.open("https://spotify.com", "_blank");
  reiniciarTemporizadorSpotify();
}

document.getElementById('modal-spotify').addEventListener('click', () => {
  reiniciarTemporizadorSpotify();
});

// 📡 Canal para recibir comandos desde admin.html
const CANAL_ADMIN = "didi_premier_admin_88"; 

function iniciarEscuchaAdmin() {
  // Conexión en tiempo real a la nube ntfy
  const eventSource = new EventSource(`https://ntfy.sh/${CANAL_ADMIN}/sse`);

  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      
      // Si la nube recibe un mensaje, actualizamos la pantalla de la tablet
      if (data.event === 'message') {
        aplicarCambioRemoto(data.message);
      }
    } catch (e) {
      console.error("Error al procesar el comando remoto:", e);
    }
  };

  eventSource.onerror = (err) => {
    console.warn("Reconectando canal de administración...", err);
  };
}

// 🔄 Aplica los cambios recibidos desde el celular del chofer
function aplicarCambioRemoto(valor) {
  const t = traducciones[idiomaActual];

  if (valor === "Apagado" || valor === "Off") {
    estadoClimaTexto = t.apagado;
  } else {
    estadoClimaTexto = valor;
    
    // Sincronizar la barra deslizable dentro del modal
    const range = document.getElementById('range-temp');
    if (valor === "HI") range.value = 32.0;
    else if (valor === "LO") range.value = 18.0;
    else {
      const num = parseFloat(valor);
      if (!isNaN(num)) range.value = num;
    }
  }

  // Actualiza el texto en la barra inferior de la tablet
  actualizarBotonClima();
  console.log(`🤖 Clima sincronizado desde el panel de chofer: ${valor}`);
}

// Activar la escucha al cargar la página
iniciarEscuchaAdmin();

