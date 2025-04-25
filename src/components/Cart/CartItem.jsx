import { useContext } from 'react'
import { CartContext } from '../../context/CartProvider'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function CartItem({ id, title, price, quantity, image }) {
  const { removeItem } = useContext(CartContext)

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <Card.Body style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {image && (
            <Card.Img 
              src={image} 
              alt={title} 
              style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '1rem' }}
            />
          )}
          <div>
            <Card.Title style={{ marginBottom: '0.5rem' }}>{title}</Card.Title>
            <Card.Text style={{ margin: 0 }}>
              Precio unitario: ${price}
            </Card.Text>
            <Card.Text style={{ margin: 0 }}>
              Cantidad: {quantity}
            </Card.Text>
          </div>
        </div>
        <Button variant="danger" onClick={() => removeItem(id)}>
          Eliminar
        </Button>
      </Card.Body>
    </Card>
  )
}

export default CartItem
