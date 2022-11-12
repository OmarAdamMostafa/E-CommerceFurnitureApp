import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if(action.type === LOAD_PRODUCTS){
    let max_price = action.payload.map((p)=>p.price)
    max_price = Math.max(...max_price) // Used to get the highest price among all the product prices

    // We used spread operator because if we set both the default and filtered products to action, it won't allow the filtered products to be reset 
    // since they both point to the same place in the memory, therefore a spread operator was used to copy the value
    return {
      ...state,
      allProducts:[...action.payload], 
      filteredProducts: [...action.payload],
      filters:{...state.filters, maxPrice:max_price, price:max_price}
    }
  }
  if(action.type === SORT_PRODUCTS){
    const {sort, filteredProducts} = state
    let tempProducts = [...filteredProducts]
    if(sort === 'price-lowest'){
      tempProducts = tempProducts.sort((a,b)=>a.price - b.price)
    }
    if(sort === 'price-highest'){
      tempProducts = tempProducts.sort((a,b)=>b.price - a.price)
    }
    if(sort === 'name-a'){
      tempProducts = tempProducts.sort((a,b)=>{
        return a.name.localeCompare(b.name)
      })
    }
    if(sort === 'name-z'){
      tempProducts = tempProducts.sort((a,b)=>{
        return b.name.localeCompare(a.name)
      })
    }
    return {...state, filteredProducts: tempProducts}
  }
  if(action.type === SET_GRIDVIEW){
    return {...state, gridView: true}
  }
  if(action.type === SET_LISTVIEW){
    return {...state, gridView: false}
  }
  if(action.type === UPDATE_SORT){
    return {...state, sort: action.payload}
  }
  if(action.type === UPDATE_FILTERS){
    const {name, value} = action.payload;
    return {...state, filters:{...state.filters,[name]:value}}
  }
  if(action.type ===  FILTER_PRODUCTS){
    return {...state}
  }
  if(action.type ===  CLEAR_FILTERS){
    return {...state, filters: {
        ...state.filters,
        text:'',
        company:'all',
        category:'all', 
        color:'all',
        price: state.filters.maxPrice,
        shipping:false
      }
    } 
  }
  
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
