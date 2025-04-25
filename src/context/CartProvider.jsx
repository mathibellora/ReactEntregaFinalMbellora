import { createContext, useState } from 'react'
import { toast } from 'react-toastify'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addItem = (item, quantity) => {
    const itemInCart = cart.find(prod => prod.id === item.id)

    if (itemInCart) {
      const updatedCart = cart.map(prod => {
        if (prod.id === item.id) {
          return { ...prod, quantity: prod.quantity + quantity }
        }
        return prod
      })
      setCart(updatedCart)
      toast.info(`Agregaste ${quantity} más de "${item.title}" al carrito.`)
    } else {
      setCart([...cart, { ...item, quantity }])
      toast.success(`Agregaste "${item.title}" al carrito.`)
    }
  }

  const removeItem = (id) => {
    const product = cart.find(prod => prod.id === id)
    if (product) {
      toast.warn(`Eliminaste "${product.title}" del carrito.`)
    }
    const updatedCart = cart.filter(prod => prod.id !== id)
    setCart(updatedCart)
  }

  const clearCart = (showToast = true) => {
    setCart([])
    if (showToast) {
      toast.error('Vaciaste el carrito.')
    }
  }

  const totalQuantity = () => {
    return cart.reduce((acc, prod) => acc + prod.quantity, 0)
  }

  const totalPrice = () => {
    return cart.reduce((acc, prod) => acc + prod.quantity * prod.price, 0)
  }

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, totalQuantity, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}
