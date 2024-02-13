import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../Images/Logo-belaboja.png'
import { useEffect, useState } from 'react';
export default function NavHeader({name}){


    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 150);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

    const logout = async () => {
        console.log("clicked")
        const response = await fetch('https://localhost:7228/api/Auth/logout',{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
    }



    let menu;
    if(!name){
        menu=(
        <div className="navbar-nav">
           <Nav.Link href="/login">Login</Nav.Link>
           <Nav.Link href="/register">Register</Nav.Link>
        </div>
        )
    }
    else{
        menu=(
            <div className="navbar-nav">
                 <a className="nav-link" href="/shoppingCartProducts">Кошничка</a>
                 <a className="nav-link" href="/myOrders">Мои нарачки</a>
                 <a className="nav-link" href="/login" onClick={logout}>Logout</a>
            </div>
            )

    }


    return(
        <>
        <Navbar id="navbar" collapseOnSelect expand="lg" className="bg-body-tertiary w-100" data-bs-theme="dark"
        style={{
            "position" : "fixed",
            "z-index": "10",
             top: visible ? '0' : '-100px',
             transition: 'top 0.7s', 
        }}>
            <Container>
                <Navbar.Brand href="/index"><img src={logo} height={50}></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="m-auto">
                    <Nav.Link href="/">Часовници</Nav.Link>
                    <Nav.Link href="#pricing">Додатоци</Nav.Link>
                    <NavDropdown title="За нас" id="collapsible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Политика на приватност</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Замена и враќање
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">За нас</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Заследи не на инстаграм
                    </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    {menu}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
        </>
    )
} 