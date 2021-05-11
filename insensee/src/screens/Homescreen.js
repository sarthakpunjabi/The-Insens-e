import React, { useState} from 'react'
import {useEffect} from "react"
import { useDispatch,useSelector } from 'react-redux'
import { Row , Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProductCarousel from '../components/ProductCarousel'
// import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'

function Homescreen({history}){
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    // , page ,pages
    const { error, loading, products} = productList

    let keyword = history.location.search
    
    useEffect(() => {
        dispatch(listProducts(keyword))
      },[dispatch,keyword]);
      
    return (
        <div>
            {!keyword && <ProductCarousel />}
            
            <h1>Latest products</h1>
            {loading?<Loader/>:error?<Message variant="danger">{error}</Message>:
            
            <Row>
            {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
                ))}
            </Row>
            // <Paginate page={page} pages={pages} keyword={keyword}/>
            
            }
            
        </div>
    )
}

export default Homescreen
