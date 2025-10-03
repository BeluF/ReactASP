import { useState, useEffect } from 'react';
import '../../App.css';
import '../../styles/index.css';
import Tablero from './Tablero';
import { calcularGanador, movimientoBot } from '../../utils/logicaJuego';
import Swal from 'sweetalert2';

export default function Juego() {
    const [historial, setHistorial] = useState([Array(9).fill(null)]);
    const [movimientoActual, setMovimientoActual] = useState(0);
    const [modo, setModo] = useState<'2' | 'bot'>('2');
    const [simboloBot] = useState<'X' | 'O'>('O');

    const xIsNext = movimientoActual % 2 === 0;
    const cuadrado = historial[movimientoActual];

    // Calculamos ganador y casillas ganadoras
    const resultado = calcularGanador(cuadrado);
    const ganador = resultado?.ganador ?? null;
    const lineaGanadora = resultado?.lineas ?? [];

    // Determinar si es turno del bot
    const turnoBot = modo === 'bot' && ((xIsNext && simboloBot === 'X') || (!xIsNext && simboloBot === 'O'));

    function handlePlay(i: number) {
        if (ganador || cuadrado[i]) return;

        const proximo = cuadrado.slice();
        proximo[i] = xIsNext ? 'X' : 'O';

        const nuevoHistorial = [...historial.slice(0, movimientoActual + 1), proximo];
        setHistorial(nuevoHistorial);
        setMovimientoActual(nuevoHistorial.length - 1);
    }

    function handleGanador(ganador: string) {
        Swal.fire({
            title: '¡Ganador!',
            text: `El ganador es ${ganador}`,
            icon: 'success',
            confirmButtonText: 'Ok'
        });
    }

    function handleEmpate() {
        Swal.fire({
            title: '¡Empate!',
            text: 'Ningún jugador ganó.',
            icon: 'info',
            confirmButtonText: 'Ok'
        });
    }

    function reiniciar() {
        setHistorial([Array(9).fill(null)]);
        setMovimientoActual(0);
    }

    // Turno del bot
    useEffect(() => {

        if (ganador) {
            handleGanador(ganador);
        }
        else if (!ganador && movimientoActual === 9) {
            handleEmpate();
        }

        if (modo !== 'bot' || !turnoBot || ganador) return;

        const timer = setTimeout(() => {
            const movimiento = movimientoBot(cuadrado, simboloBot);
            if (movimiento !== -1) {
                handlePlay(movimiento);
            }
        }, 450);

        return () => clearTimeout(timer);
    }, [movimientoActual, modo, simboloBot, ganador, turnoBot]);

    // Reinicia el juego automáticamente al cambiar de modo
    useEffect(() => {
        reiniciar();
    }, [modo]);

    return (
        <div className="juego">
            {/* Controles de modo */}
            <div className="radio-group radio-button-container">
                <label className="radio-label">
                    <input
                        type="radio"
                        value="2"
                        checked={modo === '2'}
                        onChange={() => setModo('2')}
                    />
                    <span className="radio-custom"></span>
                    2 Jugadores
                </label>

                <label className="radio-label">
                    <input
                        type="radio"
                        value="bot"
                        checked={modo === 'bot'}
                        onChange={() => setModo('bot')}
                    />
                    <span className="radio-custom"></span>
                    Jugar contra la computadora
                </label>

                <button onClick={reiniciar}>Reiniciar</button>
            </div>

            {/* Tablero */}
            <div className="juego-tablero">

                {/* Mensaje de ganador */}
                <div className="estado" style={{ marginBottom: 12, fontWeight: 'bold', fontSize: 18 }}>
                    {ganador ? `Ganador: ${ganador}` : `Siguiente jugador: ${xIsNext ? 'X' : 'O'}`}
                </div>

                <Tablero
                    xIsNext={xIsNext}
                    cuadrado={cuadrado}
                    enJuego={handlePlay}
                    modo={modo}
                    turnoBot={turnoBot}
                    lineaGanadora={lineaGanadora}
                />
            </div>
        </div>
    );
}