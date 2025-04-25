import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import CartWidget from '../Cart/CartWidget'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import { NavLink, useLocation } from 'react-router-dom'
import { getCategories } from '../../firebase/db'
import { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'

function NavBar() {
  const [categories, setCategories] = useState([])
  const location = useLocation()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesFromDB = await getCategories()
        setCategories(categoriesFromDB)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCategories()
  }, [])

  const isActiveCategory = (category) => {
    if (category === 'all' && location.pathname === '/') return true
    return location.pathname === `/category/${category}`
  }

  return (
    <Navbar style={{ backgroundColor: '#1a8c62' }} variant="dark" expand="lg">
      <Container>
        <Navbar.Brand 
          to="/" 
          as={NavLink}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <img 
            src={logo} 
            alt="Bellota Libros" 
            style={{ height: '70px' }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ alignItems: 'center', gap: '1rem' }}>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Categorías
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item 
                  as={NavLink}
                  to="/"
                  style={{
                    fontWeight: isActiveCategory('all') ? 'bold' : 'normal',
                    color: 'black'
                  }}
                >
                  Todas
                </Dropdown.Item>
                {categories.map((category, index) => (
                  <Dropdown.Item 
                    key={index}
                    as={NavLink}
                    to={`/category/${category}`}
                    style={{
                      fontWeight: isActiveCategory(category) ? 'bold' : 'normal',
                      color: 'black'
                    }}
                  >
                    {category}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Button
              as={NavLink}
              to="/orders"
              variant="outline-light"
              style={{ textDecoration: 'none' }}
            >
              Pedidos
            </Button>

            <CartWidget />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
