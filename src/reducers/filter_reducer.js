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
    // We used spread operator because if we set both the default and filtered products to action, it won't allow the filtered products to be reset 
    // since they both point to the same place in the memory, therefore a spread operator was used to copy the value
    return {...state, allProducts:[...action.payload], filteredProducts: [...action.payload]}
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
