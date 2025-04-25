import { useContext } from 'react'
import { CartContext } from '../../context/CartProvider'
import CartList from './CartList'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { FaRegSadTear } from 'react-icons/fa'

function CartContainer() {
  const { cart, clearCart, totalPrice } = useContext(CartContext)

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <FaRegSadTear 
          size={64} 
          style={{ color: '#1a8c62', marginBottom: '1rem' }}
        />
        <h2>Tu carrito está vacío...</h2>
        <p>¿Por qué no explorás nuestros libros?</p>
        <Link to="/">
          <Button variant="success" style={{ marginTop: '1rem' }}>
            Seguir explorando
          </Button>
        </Link>
      </div>
    )
  }
  

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Tu carrito</h1>
      <CartList cartItems={cart} />
      <h2>Total: ${totalPrice()}</h2>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <Button variant="danger" onClick={clearCart}>
          Vaciar carrito
        </Button>

        <Link to="/checkout">
          <Button variant="success">
            Finalizar compra
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default CartContainer
