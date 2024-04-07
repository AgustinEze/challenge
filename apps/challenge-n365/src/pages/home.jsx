import { useState, useEffect, useMemo } from 'react';
import { CreatePayment } from './payment.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import { Navigate, } from 'react-router-dom'
const BACKEND_URL = 'http://localhost:3000'



export const HomeView = () => {
    const { isAuthenticated, user } = useAuth()
    if (!isAuthenticated) {
        return <Navigate to={'/login'} replace />
    }
    const [payments, setPayments] = useState([]);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('DESC'); 
    const [flag, setFlag] = useState(false)
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/payments/all/${user.user_id}?order=${sortOrder}&key=${sortBy}&search=${search}`);
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
    }, [sortBy, sortOrder, flag, search]);

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
            payments.map((payment, index) => (
                <li key={index}>
                    Fecha: {payment.createdAt}, Motivo: {payment.reason}, Destinatario: {payment.receiver}, Monto: {payment.amount}
                </li>
            ))

        )
    }, [payments, user.username])
    const renderFormNewPayment = useMemo(() => {
        if (flag) {
            return (
                <CreatePayment setFlag={setFlag} />
            )
        }
        return null
    }, [flag])

    const handleSearch = (event) => {
        if (event.target.value.length > 2) {

            setSearch(event.target.value)
        } else {
            setSearch('')
        }

    }
    return (
        <div>
            <h1>¡Bienvenido {user.username}!</h1>
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
                <input
                    type="text"
                    placeholder="Escriba para buscar"
                    name="search"
                    onChange={handleSearch} />
                
            </div>
            <ul>
                {renderPayments}
            </ul>
            <button onClick={() => setFlag(true)}>Crear nuevo pago</button>
            {renderFormNewPayment}
        </div>
    );
};