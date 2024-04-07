import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginInput } from '../components/LoginInput.jsx'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import { useAuth } from '../hooks/useAuth.jsx'
const BACKEND_URL = 'http://localhost:3000'

export const RegisterView = () => {
    const {handleInitAuth} = useAuth()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        repeat_password: ''
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.username || !formData.email || !formData.password || !formData.repeat_password) {
            alert('Por favor, complete todos los campos')
            return
        }

        if (formData.password !== formData.repeat_password) {
            alert('Las contraseñas no coinciden')
            return
        }

        try {
            const response = await fetch(`${BACKEND_URL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
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
            alert('Hubo un error al registrar usuario')
        }
    }

    return (
        <div>
            <h1>¡Bienvenido!</h1>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>

                <LoginInput label={'Nombre de usuario:'}>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </LoginInput>


                <LoginInput label='Email:'>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </LoginInput>

                <LoginInput label='Contraseña:'>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                </LoginInput>

              

                    <LoginInput label='Repetir contraseña:'>

                        <input
                            type="password"
                            name="repeat_password"
                            value={formData.repeat_password}
                            onChange={handleChange}
                        />
                    </LoginInput>
                
                <button type="submit">Registrarse</button>
            </form>
        </div>
    )
}