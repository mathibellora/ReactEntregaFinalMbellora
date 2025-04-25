import CartItem from './CartItem'

function CartList({ cartItems }) {
  return (
    <div style={{ marginTop: '2rem' }}>
      {cartItems.map(item => (
        <CartItem key={item.id} {...item} />
      ))}
    </div>
  )
}

export default CartList
