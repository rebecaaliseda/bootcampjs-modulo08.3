import { accionesIniciarPartida, crearTablero } from './ui';
import { tablero } from './modelo';

document.addEventListener('DOMContentLoaded', crearTablero);

const botonEmpezarPartida = document.getElementById('iniciarPartidaBoton');

if (botonEmpezarPartida && botonEmpezarPartida instanceof HTMLButtonElement) {
  botonEmpezarPartida.addEventListener('click', () => {
    accionesIniciarPartida(tablero);
  });
}
