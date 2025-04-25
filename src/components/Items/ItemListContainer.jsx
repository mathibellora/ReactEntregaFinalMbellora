import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProducts, getProductsByCategory } from '../../firebase/db'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Item from './Item'

function ItemListContainer() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { categoryId } = useParams()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const productsData = categoryId
          ? await getProductsByCategory(categoryId)
          : await getProducts()
        setProducts(productsData)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categoryId])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Spinner animation="border" role="status" variant="primary" />
        <div style={{ marginTop: '1rem' }}>Cargando productos...</div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', backgroundColor: 'white', minHeight: '90vh' }}>
      <h1 style={{ marginBottom: '2rem' }}>
        {categoryId ? `Categoría: ${categoryId}` : 'Todos los Productos'}
      </h1>
      
      <Row xs={2} md={4} className="g-4">
        {products.map(product => (
          <Col key={product.id}>
            <Item {...product} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ItemListContainer
