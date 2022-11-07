import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/sidebar_reducer'
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSidebarOpen:false,
}

const SidebarContext = React.createContext()

export const SidebarProvider = ({ children }) => {
  const [state,dispatch] = useReducer(reducer,initialState)

  const openSidebar = () =>{
    dispatch({type:SIDEBAR_OPEN})
  }
  const closeSidebar = () =>{
    dispatch({type:SIDEBAR_CLOSE})
  }

  return (
    <SidebarContext.Provider value={{...state,openSidebar,closeSidebar}}>
      {children}
    </SidebarContext.Provider>
  )
}
// make sure use
export const useSidebarContext = () => {
  return useContext(SidebarContext)
}
