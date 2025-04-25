import { useEffect, useState } from 'react'
import { getOrders } from '../../firebase/db'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrders()
        setOrders(ordersData)
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Spinner animation="border" role="status" variant="primary" />
        <div style={{ marginTop: '1rem' }}>Cargando pedidos...</div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Pedidos realizados</h1>
      {orders.map((order) => (
        <Card key={order.id} style={{ marginBottom: '1rem' }}>
          <Card.Body>
            <Card.Title>Orden ID: {order.id}</Card.Title>
            <Card.Text><strong>Cliente:</strong> {order.buyer.name}</Card.Text>
            <Card.Text><strong>Email:</strong> {order.buyer.email}</Card.Text>
            <Card.Text><strong>Total:</strong> ${order.total}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

export default Orders
