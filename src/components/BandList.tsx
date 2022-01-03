import { useContext, useEffect, useState } from "react"
import { SocketContext } from "../context/SocketContext";


export const BandList = () => {

    const [bands, setBands] = useState([]);
    const { socket } = useContext<any>(SocketContext);

    useEffect(() => {
        socket.on('current-bands', (bands: any) => {
            setBands(bands);
        });

        //cuando se desmonta
        return () => socket.off('current-bands');
    }, [socket]);

    const cambioNombre = (event: any, id: string) => {
        const name = event.target.value;

        setBands((bands: any) => bands.map((band: any) => {
            if (band.id === id) band.name = name;
            return band;
        }));
    }

    const onPedidoFoco = (id: string, nombre: string) => socket.emit('cambiarNombre-band', { id, nombre });

    const votar = (id: string) => socket.emit('votar-banda', id);

    const eliminarBanda = (id: string) => socket.emit('eliminar-banda', id);

    const crearRows = () => {
        return (
            bands.map((band: any) => (
                <tr key={band.id}>
                    <td>
                        <button
                            className="btn btn-primary"
                            onClick={() => votar(band.id)}
                        >+1</button>
                    </td>
                    <td>
                        <input
                            className="form-control"
                            type="text"
                            value={band.name}
                            onChange={(event) => cambioNombre(event, band.id)}
                            onBlur={() => onPedidoFoco(band.id, band.name)}
                        />
                    </td>
                    <td>
                        <h3>{band.votes}</h3>
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => eliminarBanda(band.id)}
                        >Borrar</button>
                    </td>
                </tr>
            ))
        )
    }

    return (
        <div>
            <h3>Bandas actuales</h3>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {crearRows()}
                </tbody>
            </table>
        </div>
    )
}
