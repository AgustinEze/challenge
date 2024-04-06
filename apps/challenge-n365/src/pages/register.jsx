import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const RegisterView = () => {
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
      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
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
        <div>
          <label>Nombre de usuario:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Repetir contraseña:</label>
          <input
            type="password"
            name="repeat_password"
            value={formData.repeat_password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  )
}