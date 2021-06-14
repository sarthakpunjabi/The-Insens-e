import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Navbar,Nav,Container,Row,Form,FormControl,Button,NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import '../index.css';
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
                <Navbar  bg="dark" expand="lg">
                    {/* <Container> */}
                        <LinkContainer to="/">
                        <Navbar.Brand class="brand">The INSENSEÉ</Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        
                        <Nav className="mr-auto">
                        {/* <Nav.Link href="#home"><i className="fa fa-home"></i></Nav.Link> */}
                        <LinkContainer to="/cart">
                            <Nav.Link ><i className="fas fa-shopping-cart"></i></Nav.Link>
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
                            <Nav.Link ><i className="fas fa-user"></i></Nav.Link>
                            </LinkContainer>
                        )}
                        
                        
                    </Nav>
                    {/* <Form inline> */}
                        
                    {/* </Form> */}

                <div id="sea" className="d-flex justify-content-end"><SearchBox /></div>
                </Navbar.Collapse>
                
                {/* </Container> */}
                </Navbar>
             
            </header>
        
    )
}

export default Header
