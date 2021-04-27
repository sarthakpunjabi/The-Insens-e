import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Navbar,Nav,Container,Row,Form,FormControl,Button,NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import {logout} from '../actions/userActions'
function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()
    const logoutHandler  = () =>{
        dispatch(logout())
    }

    return (
        
            <header>
                <Navbar bg="dark" expand="lg" variant="dark">
                    <Container>
                        <LinkContainer to="/">
                        <Navbar.Brand>Insensee</Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        
                        <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <LinkContainer to="/cart">
                            <Nav.Link ><i className="fas fa-shopping-cart">cart</i></Nav.Link>
                        </LinkContainer>

                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id="username">
                                <LinkContainer to= '/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}> Logout</NavDropdown.Item>
                            </NavDropdown>
                        ): (
                            <LinkContainer to="/login">
                            <Nav.Link ><i className="fas fa-user">login</i></Nav.Link>
                            </LinkContainer>
                        )}
                        
                        
                    </Nav>
                    <Form inline>
                        <SearchBox/>
                    </Form>

                    
                </Navbar.Collapse>
                
                </Container>
                </Navbar>
            </header>
        
    )
}

export default Header
