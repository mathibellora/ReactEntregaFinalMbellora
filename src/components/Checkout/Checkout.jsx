import { useContext, useState } from 'react'
import { CartContext } from '../../context/CartProvider'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'

function Checkout() {
  const { cart, totalPrice, clearCart } = useContext(CartContext)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [orderId, setOrderId] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const order = {
      buyer: { name, phone, email },
      items: cart.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity
      })),
      total: totalPrice(),
      date: Timestamp.now()
    }

    try {
      setLoading(true)
      const ordersRef = collection(db, 'orders')
      const newOrder = await addDoc(ordersRef, order)
      setOrderId(newOrder.id)
      setShowModal(true)
      clearCart(false)
    } catch (error) {
      console.error('Error al generar la orden:', error)
      toast.error('Hubo un problema al finalizar la compra.')
    } finally {
      setLoading(false)
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
    navigate('/')
  }

  const handleCopyId = () => {
    navigator.clipboard.writeText(orderId)
    toast.success('¡ID copiado al portapapeles!')
  }

  const handleGoToOrders = () => {
    setShowModal(false)
    navigate('/orders')
  }

  if (cart.length === 0 && !showModal) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>No hay productos en el carrito.</h2>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Finalizar compra</h1>
      <Form onSubmit={handleSubmit}>
        {/* Formulario igual que antes */}
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Button variant="success" type="submit" disabled={loading}>
          {loading ? 'Procesando...' : 'Finalizar compra'}
        </Button>
      </Form>

      {/* Modal para mostrar Order ID */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>¡Compra realizada!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tu número de orden es:</p>
          <p style={{ fontWeight: 'bold', wordBreak: 'break-word' }}>{orderId}</p>
          <p>Podés copiarlo si lo necesitás.</p>
        </Modal.Body>
        <Modal.Footer style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <Button variant="outline-primary" onClick={handleCopyId}>
            Copiar ID
          </Button>
          <Button variant="outline-success" onClick={handleGoToOrders}>
            Ver pedidos
          </Button>
          <Button variant="success" onClick={handleModalClose}>
            Volver al inicio
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Checkout
