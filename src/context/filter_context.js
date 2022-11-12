import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filteredProducts: [],
  allProducts: [],
  gridView: true,
  sort: 'price-lowest', // Must be the same as one of the option values
  filters:{
    text:'',
    company:'all',
    category:'all', 
    color:'all',
    minPrice:0,
    maxPrice:0,
    price:0,
    shipping:false,
  },
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const [state,dispatch] = useReducer(reducer,initialState)
  const {products} = useProductsContext()

  useEffect(()=>{
    dispatch({type:LOAD_PRODUCTS, payload: products})
  },[products])

  useEffect(()=>{
    dispatch({type: FILTER_PRODUCTS})
    dispatch({type: SORT_PRODUCTS})
  },[products,state.sort,state.filters])

  const setGridView = () =>{
    dispatch({type:SET_GRIDVIEW})
  }

  const setListView = () =>{
    dispatch({type:SET_LISTVIEW})
  }

  const updateSort = (e) =>{
    const value = e.target.value // Used to get the value of the input
    console.log(value)
    dispatch({type:UPDATE_SORT, payload: value})
  }

  const updateFilters = (e) =>{
    let name = e.target.name;
    let value = e.target.value;
    if(name === 'category'){ // Since the category part uses buttons which do not have values, Therefore each buttons textContent is used instead
      value = e.target.textContent
    }
    if(name === 'color'){ // Since the color part uses buttons which do not have values
      value = e.target.dataset.color
    }
    if(name === 'price'){ // This is done because after adjusting the price range, the actual price is set as a string instead of an int
      value = Number(value)
    }
    if(name === 'shipping'){ // Since the shipping part uses a checkbox which does not have a value
      value = e.target.checked
    }
    dispatch({type: UPDATE_FILTERS, payload:{name,value}})
  }

  const clearFilters = () =>{
    dispatch({type: CLEAR_FILTERS})
  }

  return (
    <FilterContext.Provider value={{...state,setGridView,setListView,updateSort,updateFilters,clearFilters}}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
