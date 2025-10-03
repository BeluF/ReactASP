import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Cuadrado({ valor, cuadradoClick }) {
    return (
        <button className="cuadrado" onClick={cuadradoClick}>
            {valor }
        </button>)
}

function Tablero({ xIsNext, cuadrado, enJuego }) {
    function handleClick(i) {
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

    const ganador = calcularGanador(cuadrado);
    let estado;

    if (ganador) {
        estado = 'Ganador: ' + ganador;
    } else {
        estado = 'Siguiente jugador: ' + (xIsNext ? 'X' : 'O');
    }

return (
    <>
        <div className="status">{estado}</div>
        <div className="board-row">
            <Cuadrado valor={cuadrado[0]} cuadradoClick={() => handleClick(0)} />
            <Cuadrado valor={cuadrado[1]} cuadradoClick={() => handleClick(1)} />
            <Cuadrado valor={cuadrado[2]} cuadradoClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
            <Cuadrado valor={cuadrado[3]} cuadradoClick={() => handleClick(3)} />
            <Cuadrado valor={cuadrado[4]} cuadradoClick={() => handleClick(4)} />
            <Cuadrado valor={cuadrado[5]} cuadradoClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
            <Cuadrado valor={cuadrado[6]} cuadradoClick={() => handleClick(6)} />
            <Cuadrado valor={cuadrado[7]} cuadradoClick={() => handleClick(7)} />
            <Cuadrado valor={cuadrado[8]} cuadradoClick={() => handleClick(8)} />
        </div>
    </>
);
}
export default function Juego(){
    const [historial, setHistorial] = useState([Array(9).fill(null)]);
    const [movimientoActual, setMovimientoActual] = useState(0);

    const xIsNext = (movimientoActual % 2) === 0;
    const cuadrado = historial[movimientoActual];

    function handlePlay(proximoCuadrado) {
        const nuevoHistorial = [...historial.slice(0, movimientoActual + 1), proximoCuadrado];
        setHistorial(nuevoHistorial);
        setMovimientoActual(nuevoHistorial.length - 1);
    }

    function irAMovimiento(movimiento) {
        setMovimientoActual(movimiento);
    }

    const movimientos = historial.map((cuadrado, movimiento) => {
        let descripcion;

        if(movimiento > 0){
            descripcion = 'Ir al movimiento #' + movimiento;
        }
        else{
            descripcion = 'Ir al inicio del juego';
        }
        return (
            <li key={movimiento}>
                <button onClick={() => irAMovimiento(movimiento)}>{descripcion}</button>
            </li>
        )
    });

    return (
        <div className="juego">
            <div className="juego-tablero">
                <Tablero xIsNext={xIsNext} cuadrado={cuadrado} enJuego={handlePlay} />
            </div>
            <div className="juego-info">
                <ol>{movimientos}</ol>
            </div>
        </div>
    );
}

function calcularGanador(cuadrado) {
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
            return cuadrado[a];
        }
    }
    return null;
}
