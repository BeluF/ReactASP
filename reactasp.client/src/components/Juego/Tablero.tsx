interface TableroProps {
    xIsNext: boolean;
    cuadrado: (string | null)[];
    enJuego: (i: number) => void;
    modo?: '2' | 'bot';
    turnoBot?: boolean;
    lineaGanadora?: number[];
}

export default function Tablero({ cuadrado, enJuego, lineaGanadora = [] }: TableroProps) {

    function handleClick(i: number) {
        if (cuadrado[i]) return;
        enJuego(i);
    }

    const filas = [];
    for (let i = 0; i < 3; i++) {
        filas.push(cuadrado.slice(i * 3, i * 3 + 3));
    }

    return (
        <div>
            {filas.map((fila, filaIndex) => (
                <div key={filaIndex} className="board-row">
                    {fila.map((valor, colIndex) => {
                        const indice = filaIndex * 3 + colIndex;
                        const esGanador = lineaGanadora.includes(indice);
                        return (
                            <button
                                key={indice}
                                onClick={() => handleClick(indice)}
                                className={`cuadrado ${esGanador ? 'ganador' : ''}`}
                            >
                                {valor}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
