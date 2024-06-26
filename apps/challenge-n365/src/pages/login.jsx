/* eslint-disable react/prop-types */

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LoginInput } from "../components/LoginInput.jsx"
import dayjs from "dayjs"
import Cookies from 'js-cookie'
import { useAuth } from "../hooks/useAuth.jsx"
const BACKEND_URL = 'http://localhost:3000'


export const LoginView = () => {
    const {handleInitAuth} = useAuth()
    const [formData, setFormData] = useState({ user: '', password: '' })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${BACKEND_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                const auth = await response.json()
                const expires = dayjs().add(8, 'hour').toDate()
                Cookies.set('challenge.token', auth.token, { expires, sameSite: 'strict' })
                handleInitAuth()
                navigate('/home')
            } else {
                const { error } = await response.json()
                alert(error)
            }
        } catch (error) {
            alert(error.message)
        }
    }
    return (

        <div>
            <h1>¡Bienvenido!</h1>
            <div >
                <form onSubmit={handleSubmit}>

                    <h2>Iniciar Sesión</h2>
                    <LoginInput label='Mail o Nombre de Usuario:'>
                        <input
                            type="text"
                            placeholder="Mail o Nombre de Usuario"
                            name="user"
                            value={formData.user}
                            onChange={handleChange} />
                    </LoginInput>
                    <LoginInput label='Contraseña:'>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </LoginInput>
                    <button type="submit">
                        Iniciar sesion
                    </button>
                    <Link to="/register">
                        <h2>Registrarse</h2>
                    </Link>
                </form>
            </div>
        </div>
    )
}