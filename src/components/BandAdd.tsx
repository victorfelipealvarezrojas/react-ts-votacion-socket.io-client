import { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext';

export const BandAdd = () => {

    const [valor, setValor] = useState<string>('');
    const { socket } = useContext<any>(SocketContext);

    const onSubmit = (event: any) => {
        event.preventDefault();
        if (valor.length > 0) {
            socket.emit('nueva-banda', valor);
            setValor('');
        }
    }

    return (
        <div>
            <h3>Agregar Banda</h3>
            <form onSubmit={onSubmit}>
                <input
                    className="form-control"
                    placeholder="Nuevo nombre de banda"
                    value={valor}
                    onChange={(event) => setValor(event.target.value)}
                />
            </form>
        </div>
    )
}
