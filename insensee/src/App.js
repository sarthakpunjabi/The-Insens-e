import { Container  } from 'react-bootstrap'
import logo from './logo.svg';
import './App.css';
import {HashRouter as Router,Route} from 'react-router-dom' 
import Header from './components/Header'
import Footer from './components/footer'
import Homescreen from './screens/Homescreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'



function App() {
  return (
    <Router>
        <Header/>
        <main className="py-3">
          <Container>
             <h1>insensee</h1>
             <Route path='/' component={Homescreen} exact />
             <Route path='/login' component={LoginScreen}/>
             <Route path='/register' component={RegisterScreen}/>
             <Route path='/profile' component={ProfileScreen}/>
             <Route path='/shipping' component={ShippingScreen}/>
             <Route path='/payment' component={PaymentScreen}/>
             <Route path='/placeorder' component={PlaceOrderScreen}/>
             <Route path='/order/:id' component={OrderScreen}/>
             <Route path='/product/:id' component={ProductScreen}/>
             <Route path='/cart/:id?' component={CartScreen}/>
          </Container>
        </main>
        <Footer/>
    </Router>
  );
}

export default App;
