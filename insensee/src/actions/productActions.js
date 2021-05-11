import axios from 'axios'
import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,

    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    

 }from '../constants/productConstants'

export const listProducts = (keyword='') => async(dispatch) =>{
    try{
        dispatch({type:PRODUCT_LIST_REQUEST})
        const {data} = await axios.get(`/api/products${keyword}`)
        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:error.response && error.response.data.detail ?error.response.data.detail:error.message
        })
    }
 }

export const listTopProducts = () => async(dispatch) =>{
    try{
        dispatch({type:PRODUCT_TOP_REQUEST})
        const {data} = await axios.get(`/api/products/top/`)
        dispatch({
            type:PRODUCT_TOP_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:PRODUCT_TOP_FAIL,
            payload:error.response && error.response.data.detail ?error.response.data.detail:error.message
        })
    }
 }

export const listProductDetails = (id) => async(dispatch) =>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/products/${id}`)
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response && error.response.data.detail?error.response.data.detail:error.message
        })
    }
 }


export const createProductReview = (productId,review) => async (dispatch,getState) => {
    try{
        dispatch({
            type:PRODUCT_CREATE_REVIEW_REQUEST
        })

        const {
            userLogin : { userInfo },

        } = getState()

        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            `/api/products/${productId}/reviews/`,
            review,
            config
        )
        dispatch({
            type:PRODUCT_CREATE_REVIEW_SUCCESS,
            payload:data,
        })

        
    }
    catch(error){
        dispatch({
            type:PRODUCT_CREATE_REVIEW_FAIL,
            payload:error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }

}

 
 