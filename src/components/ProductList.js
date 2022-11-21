import React from 'react'
import { useSelector } from 'react-redux'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const {filteredProducts, gridView} = useSelector((store)=>store.filter)

  if(filteredProducts.length < 1){
    return <h5 style={{textTransform: 'none'}}>
      Sorry, no products matched your search...
    </h5>
  }

  if(!gridView){
    return <ListView products={filteredProducts}/>
  }
  
  return <GridView products={filteredProducts}/>
}

export default ProductList
