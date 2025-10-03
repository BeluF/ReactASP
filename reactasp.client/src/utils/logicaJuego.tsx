//Calcular el ganador del juego
export type Cuadrado = string | null;

export function calcularGanador(cuadrado: (string | null)[]) {
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
//Fin calcular ganador del juego

//Movimientos disponibles

//Fin movimientos disponibles
export function movimientosDisponibles(cuadrado: Cuadrado[]): number[] {
    return cuadrado.map((value, index) => value === null ? index : null).filter(value => value !== null) as number[];
}
//Tablero lleno
export function tableroLleno(cuadrado: Cuadrado[]): boolean {
    return cuadrado.every(value => value !== null);
}
//Fin tablero lleno

//Movimiento del bot
export function movimientoBot(cuadrado: Cuadrado[], bot: 'X' | 'O'): number {
    const oponenete = bot === 'X' ? 'O' : 'X';
    const disponibles = cuadrado.map((value, index) => value === null ? index : -1).filter(index => index !== -1);

    for (const i of disponibles) {
        const copia = cuadrado.slice();
        copia[i] = bot;
        const r = calcularGanador(copia);
        if (r && r.ganador === bot) {
            return i;
        }
    }

    for (const i of disponibles) {
        const copia = cuadrado.slice();
        copia[i] = oponenete;
        const r = calcularGanador(copia);
        if (r && r.ganador === oponenete) {
            return i;
        }
    }

    if (cuadrado[4] === null) {
        return 4;
    }

    const esquinas = [0, 2, 6, 8].filter(i => cuadrado[i] === null);
    if (esquinas.length > 0) {
        return esquinas[Math.floor(Math.random() * esquinas.length)];
    }

    const lados = [1, 3, 5, 7].filter(i => cuadrado[i] === null);
    if (lados.length > 0) {
        return lados[Math.floor(Math.random() * lados.length)];
    }
    return -1; // No hay movimientos disponibles
}
//Fin movimiento del bot