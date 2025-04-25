import { useContext, useState } from 'react'
import { CartContext } from '../../context/CartProvider'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import '../../styles/CardHover.css'

function ItemDetail({ id, title, description, price, image }) {
  const { addItem } = useContext(CartContext)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    const item = { id, title, price, image }
    addItem(item, quantity)
  }

  const handleIncrease = () => {
    setQuantity(prev => prev + 1)
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  return (
    <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
      <Card className="card-hover" style={{ width: '24rem' }}>
        {image && (
          <Card.Img
            variant="top"
            src={image}
            alt={title}
            style={{ objectFit: 'cover', height: '300px' }}
          />
        )}
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text><strong>Precio:</strong> ${price}</Card.Text>

          {/* Contador de cantidad */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
            <Button variant="outline-primary" onClick={handleDecrease}>-</Button>
            <span style={{ fontSize: '1.2rem' }}>{quantity}</span>
            <Button variant="outline-primary" onClick={handleIncrease}>+</Button>
          </div>

          <Button 
            variant="primary" 
            onClick={handleAddToCart} 
            style={{ width: '100%' }}
          >
            Agregar al carrito
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ItemDetail
