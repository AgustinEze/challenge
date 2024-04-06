import { useState, useEffect, useMemo } from 'react';
import { CreatePayment } from './payment';

export const HomeView = () => {
    const [payments, setPayments] = useState([]);
    const [sortBy, setSortBy] = useState('createdAt'); // Por defecto, ordenar por fecha
    const [sortOrder, setSortOrder] = useState('DESC'); // Por defecto, ordenar de más reciente a más antigua
    const [flag, setFlag]  = useState(false)

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch(`http://localhost:3000/payments/all/13b2f543-0baa-465a-a33e-e37dd1f82bf7?order=${sortOrder}&key=${sortBy}`);
                if (response.ok) {
                    const data = await response.json();
                    setPayments(data);
                } else {

                    console.error('Error al obtener transacciones:', response.statusText);
                }
            } catch (error) {
                console.error('Error al obtener transacciones:', error);
            }
        };

        fetchPayments();
    }, [sortBy, sortOrder]);

    const handleSortChange = (event) => {
        const { name, value } = event.target;
        if (name === 'sortBy') {
            setSortBy(value);
        } else if (name === 'sortOrder') {
            setSortOrder(value);
        }
    };

    const renderPayments = useMemo(() => {
        return (
            payments.map((payment) => (
                <li key={payment.id}>
                    Fecha: {payment.createdAt}, Motivo: {payment.reason}, Destinatario: {payment.receiver}, Monto: {payment.amount}
                </li>
            ))

        )
    }, [payments])

    const renderFormNewPayment = useMemo(()=>{
        if(flag){
            return (
                <CreatePayment setFlag={setFlag}/>
            )
        }
        return null
    },[flag])

    return (
        <div>
            <h1>¡Bienvenido!</h1>
            <h2>Transacciones</h2>
            <div>
                <label>Ordenar por:</label>
                <select name="sortBy" value={sortBy} onChange={handleSortChange}>
                    <option value="createdAt">Fecha</option>
                    <option value="reason">Motivo</option>
                    <option value="receiver">Destinatario</option>
                    <option value="amount">Monto</option>
                </select>
                <select name="sortOrder" value={sortOrder} onChange={handleSortChange}>
                    <option value="DESC">Más reciente primero</option>
                    <option value="ASC">Más antiguo primero</option>
                </select>
            </div>
            <ul>
                {renderPayments}
            </ul>
            <button onClick={()=>setFlag(true)}>Crear nuevo pago</button>
            {renderFormNewPayment}
        </div>
    );
};