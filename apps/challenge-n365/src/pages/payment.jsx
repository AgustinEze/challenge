import  { useState } from 'react';

// eslint-disable-next-line react/prop-types
export const CreatePayment = ({setFlag}) => {
  const [formData, setFormData] = useState({
    amount: '',
    receiver: '',
    date: '',
    reason: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos
    if (!formData.amount || !formData.receiver || !formData.date || !formData.reason) {
      alert('Por favor, complete todos los campos');
      return;
    }

    // Envío de datos al servidor
    try {
      const response = await fetch('http://localhost:3000/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Pago creado exitosamente');
        // Limpiar el formulario después de enviar los datos
        setFormData({
          amount: '',
          receiver: '',
          date: '',
          reason: ''
        });
        setFlag(false)
      } else {
        // Manejar errores si la solicitud no es exitosa
        const { error } = await response.json();
        alert('Error al crear el pago: ' + error);
      }
    } catch (error) {
      console.error('Error al crear el pago:', error);
      alert('Hubo un error al crear el pago. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div>
      <h1>Crear Nuevo Pago</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Monto:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Destinatario:</label>
          <input
            type="text"
            name="receiver"
            value={formData.receiver}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Fecha:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Motivo:</label>
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Crear Pago</button>
      </form>
      <button onClick={()=>setFlag(false)}>Cerrar</button>
    </div>
  );
};