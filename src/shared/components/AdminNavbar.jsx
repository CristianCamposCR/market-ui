import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
const AdminNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">LOGO</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to={"/"} className="ms-1 nav-link">Productos</Link>
            <Link to={"/category"} className="ms-1 nav-link">Categorias</Link>
            <Link to={"/subcategory"} className="ms-1 nav-link">Subcategorias</Link>

          </Nav>
          <Button variant='primary'>
            Cerrar sesion
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AdminNavbar
