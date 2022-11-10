import { act } from 'react-dom/test-utils'
import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const products_reducer = (state, action) => {
  //-----------------Products------------------------
  if(action.type === GET_PRODUCTS_BEGIN){
    return {...state, productsLoading:true, productsError:false}
  }
  if(action.type === GET_PRODUCTS_SUCCESS){
    const featureProducts = action.payload.filter((product)=>product.featured === true)
    return {
      ...state,
      productsLoading:false, 
      featuredProducts:featureProducts, 
      products:action.payload
    }
  }
  if(action.type === GET_PRODUCTS_ERROR){
    return {...state, productsLoading:false, productsError:true}
  }

  //-----------------Single Product-------------------
  if(action.type === GET_SINGLE_PRODUCT_BEGIN){
    return {...state, singleProductLoading:true, singleProductError:false}
  }
  if(action.type === GET_SINGLE_PRODUCT_SUCCESS){
    return {
      ...state,
      singleProductLoading:false, 
      singleProduct:action.payload
    }
  }
  if(action.type === GET_SINGLE_PRODUCT_ERROR){
    return {...state, singleProductLoading:false, singleProductError:true}
  }

  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default products_reducer
