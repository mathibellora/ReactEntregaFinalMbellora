import { useContext } from 'react'
import { CartContext } from '../../context/CartProvider'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import Badge from 'react-bootstrap/Badge'

function CartWidget() {
  const { totalQuantity } = useContext(CartContext)
  const quantity = totalQuantity()

  return (
    <Link to="/cart" style={{ color: 'white', textDecoration: 'none', position: 'relative' }}>
      <FaShoppingCart size={24} />
      {quantity > 0 && (
        <Badge 
          bg="danger" 
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            borderRadius: '50%',
            fontSize: '0.75rem'
          }}
        >
          {quantity}
        </Badge>
      )}
    </Link>
  )
}

export default CartWidget
