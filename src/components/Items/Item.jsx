import { useContext, useState } from 'react'
import { CartContext } from '../../context/CartProvider'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import '../../styles/CardHover.css'

function Item({ id, title, price, image }) {
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
    <Card className="card-hover" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Link to={`/item/${id}`} style={{ textDecoration: 'none' }}>
        {image && (
          <Card.Img 
            variant="top" 
            src={image} 
            alt={title} 
            style={{ objectFit: 'cover', height: '300px' }}
          />
        )}
      </Link>
      <Card.Body>
        <Card.Title style={{ fontSize: '1rem', minHeight: '48px' }}>{title}</Card.Title>
        <Card.Text>
          Precio: ${price}
        </Card.Text>

        {/* Contador de cantidad */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem', gap: '0.5rem' }}>
          <Button variant="outline-primary" size="sm" onClick={handleDecrease}>-</Button>
          <span style={{ fontSize: '1rem' }}>{quantity}</span>
          <Button variant="outline-primary" size="sm" onClick={handleIncrease}>+</Button>
        </div>

      </Card.Body>
      <Card.Footer style={{ background: 'transparent', borderTop: 'none' }}>
        <Button 
          variant="primary" 
          onClick={handleAddToCart} 
          style={{ width: '100%' }}
        >
          Agregar al carrito
        </Button>
      </Card.Footer>
    </Card>
  )
}

export default Item
