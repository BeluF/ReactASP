export default function Cuadrado({ valor, cuadradoClick, esGanador, desactivado }: { valor: string | null; cuadradoClick: () => void; esGanador: boolean; desactivado?: boolean }) {
    return (
        <button className={`cuadrado ${esGanador ? 'ganador' : ''}`} onClick={cuadradoClick} disabled={desactivado}
        >
            {valor}
        </button>)
}