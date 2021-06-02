import axios from "axios";
import React,{useState,useEffect} from 'react'
import {Button ,Row,Col,ListGroup,Image,Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import  Message  from '../components/Message'
import  Loader  from '../components/Loader'

import { getOrderDetails,payOrder } from '../actions/orderActions'
import {  ORDER_PAY_RESET} from '../constants/orderConstants'

function OrderScreen({match}) {
    const orderId = match.params.id
    const dispatch = useDispatch()

    const [sdkReady,setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order ,error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading:loadingPay,success:successPay } = orderPay
    
   
    if(!loading && !error ){
        order.itemsPrice = order.orderItems.reduce((acc,item)=> acc +item.price *item.qty,0).toFixed(2)
    }
    
    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true
        script.onload = () =>{
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    const loadScript = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(script);
        return new Promise.all([])
      };

    const showRazorpay = async () => {
        const res = await loadScript();

        let bodyData = new FormData();
        bodyData.append("amount", order.totalPrice.toString());
        bodyData.append("name", "name");

       
        const {data}= await axios({
            url: `/api/orders/payment/`,
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              
            },
            data: bodyData,
          })

          var options = {
            y_id: `** your razorpay public key id **`,
            key_secret: `** your razorpay secret key id **`,
            amount: order.totalPrice,
            currency: "INR",
            name: "Insensee",
            description: "Test teansaction",
            image: "", // add image url
            order_id: Number(orderId),
            handler: function (response) {
                // we will handle success by calling handlePayment method and
                // will pass the response that we've got from razorpay
                handlePaymentSuccess(response);
              },
              prefill: {
                name: "user's Name",
                email: "User's email",
                contact: "User's phone",
              },
              notes: {
                address: "Razorpay Corporate Office",
              },
              theme: {
                color: "#3399cc",
              },
        }
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    const handlePaymentSuccess = async (response) => {
        try {
          let bodyData = new FormData();
    
          // we will send the response we've got from razorpay to the backend to validate the payment
          bodyData.append("response", JSON.stringify(response));
    
          await axios({
            url: `api/orders/payment/success/`,
            method: "POST",
            data: bodyData,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                
            },
          })
              .then((res) => {
                console.log("Everything is OK!");
                // setName("");
                // setAmount("");
              })
              .catch((err) => {
                console.log(err);
              });
        } catch (error) {
          console.log(console.error());
        }
      };    
    
    useEffect(()=>{
        if(!order || successPay|| order._id !== Number(orderId)){
            dispatch({type:ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }
        
    },[dispatch,order,orderId,successPay])

    const successPaymentHandler = (paymentResult) =>{
        dispatch(payOrder(orderId,paymentResult))

    }
    
    return loading ? (
        <Loader />
    ): error ? (
        <Message variant='danger'>{error}</Message>
    ): (
        <div>
            <h1>Order : {order._id}</h1>
            <Row>
                
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p><strong>Name : </strong>{order.user.name}</p>
                                <p><strong>Email : </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                                <p>
                                    <strong>Shipping : </strong>
                                    {order.ShippingAddress.address},{order.ShippingAddress.city},
                                    { ' ' }
                                    {order.ShippingAddress.postalCode},
                                    { ' ' }

                                    {order.ShippingAddress.country}
                                    { ' ' }
                                </p>

                                {order.isDelivered ? (
                                    <Message variant='success'>Delievered on {order.deliveredAt}</Message>
                                ) : (
                                    <Message variant='warning'>Not Paid</Message>
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>

                                <p>
                                    <strong>Method : </strong>
                                    {order.paymentMethod}
                                </p>

                                {order.isPaid ? (
                                    <Message variant='success'>Paid on {order.paidAt}</Message>
                                ) : (
                                    <Message variant='warning'>Not Paid</Message>
                                )}

                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>

                                {order.orderItems.length === 0 ? <Message variant="info">Order is Empty</Message>:(
                                    <ListGroup variant="flush">
                                        {order.orderItems.map((item,index)=>(
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src = {item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.qty} X ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>

                        </ListGroup>
                    </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Item : 
                                            </Col>
                                            <Col>₹{order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                shipping : 
                                            </Col>
                                            <Col>₹{order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                tax : 
                                            </Col>
                                            <Col>₹{order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Total : 
                                            </Col>
                                            <Col>₹{order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader/>}
                                            <button onClick={showRazorpay} className="btn btn-primary btn-block">
                                                Pay with razorpay
                                            </button>
                                        </ListGroup.Item>
                                    )}


                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
)

}
export default OrderScreen
