import { useState } from 'react'

import './App.css'

function Cuadrado({ valor, cuadradoClick, esGanador }: { valor: string | null; cuadradoClick: () => void; esGanador: boolean }) {
    return (
        <button className={`cuadrado ${esGanador ? 'ganador' : ''}`} onClick={cuadradoClick}>
            {valor}
        </button>)
}

function Tablero({ xIsNext, cuadrado, enJuego }: { xIsNext: boolean; cuadrado: (string | null)[]; enJuego: (cuadrado: (string | null)[]) => void }) {
    const resultado = calcularGanador(cuadrado);
    const ganador = resultado ? resultado.ganador : null;
    const lineaGanadoras = resultado ? resultado.lineas : [];

    function handleClick(i: number) {
        if (calcularGanador(cuadrado) || cuadrado[i]) {
            return;
        }
        const proximoCuadrado = cuadrado.slice();
        if (xIsNext) {
            proximoCuadrado[i] = 'X';
        } else {
            proximoCuadrado[i] = 'O';

        }
        enJuego(proximoCuadrado);

    }

    let estado, claseEstado = "";

    if (ganador) {
        estado = 'Ganador: ' + ganador;
        claseEstado = "estado-ganador";

    } else {
        estado = 'Siguiente jugador: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <>
            <div className="estado"><p className={`estadoP ${claseEstado}`}>{estado}</p></div>
            <div className="board-row">
                <Cuadrado valor={cuadrado[0]} cuadradoClick={() => handleClick(0)} esGanador={lineaGanadoras.includes(0)} />
                <Cuadrado valor={cuadrado[1]} cuadradoClick={() => handleClick(1)} esGanador={lineaGanadoras.includes(1)} />
                <Cuadrado valor={cuadrado[2]} cuadradoClick={() => handleClick(2)} esGanador={lineaGanadoras.includes(2)} />
            </div>
            <div className="board-row">
                <Cuadrado valor={cuadrado[3]} cuadradoClick={() => handleClick(3)} esGanador={lineaGanadoras.includes(3)} />
                <Cuadrado valor={cuadrado[4]} cuadradoClick={() => handleClick(4)} esGanador={lineaGanadoras.includes(4)} />
                <Cuadrado valor={cuadrado[5]} cuadradoClick={() => handleClick(5)} esGanador={lineaGanadoras.includes(5)} />
            </div>
            <div className="board-row">
                <Cuadrado valor={cuadrado[6]} cuadradoClick={() => handleClick(6)} esGanador={lineaGanadoras.includes(6)} />
                <Cuadrado valor={cuadrado[7]} cuadradoClick={() => handleClick(7)} esGanador={lineaGanadoras.includes(7)} />
                <Cuadrado valor={cuadrado[8]} cuadradoClick={() => handleClick(8)} esGanador={lineaGanadoras.includes(8)} />
            </div>
        </>
    );
}

export default function Juego() {
    const [historial, setHistorial] = useState([Array(9).fill(null)]);
    const [movimientoActual, setMovimientoActual] = useState(0);

    const xIsNext = (movimientoActual % 2) === 0;
    const cuadrado = historial[movimientoActual];

    function handlePlay(proximoCuadrado: (string | null)[]) {
        const nuevoHistorial = [...historial.slice(0, movimientoActual + 1), proximoCuadrado];
        setHistorial(nuevoHistorial);
        setMovimientoActual(nuevoHistorial.length - 1);
    }

    return (
        <div className="juego">
            <div className="juego-tablero">
                <Tablero xIsNext={xIsNext} cuadrado={cuadrado} enJuego={handlePlay} />
            </div>
            <div className="juego-info">
                <ol>...</ol>
            </div>
        </div>
    );
}

function calcularGanador(cuadrado: (string | null)[]) {
    const lineas = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lineas.length; i++) {
        const [a, b, c] = lineas[i];
        if (cuadrado[a] && cuadrado[a] === cuadrado[b] && cuadrado[a] === cuadrado[c]) {
            return { ganador: cuadrado[a], lineas: [a, b, c] };
        }
    }
    return null;
}
