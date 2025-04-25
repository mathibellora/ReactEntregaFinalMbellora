import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../firebase/db'
import Spinner from 'react-bootstrap/Spinner'
import ItemDetail from './ItemDetail'

function ItemDetailContainer() {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { itemId } = useParams()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const productData = await getProductById(itemId)
        setProduct(productData)
      } catch (error) {
        console.error('Error fetching product detail:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [itemId])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Spinner animation="border" role="status" variant="primary" />
        <div style={{ marginTop: '1rem' }}>Cargando producto...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>Producto no encontrado.</h2>
      </div>
    )
  }

  return <ItemDetail {...product} />
}

export default ItemDetailContainer
