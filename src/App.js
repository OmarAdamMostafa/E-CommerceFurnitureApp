import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import {Home,About,Cart,Error,CheckOut,Products,SingleProduct,PrivateRoute,AuthWrapper} from './pages'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './features/ProductsFeature/productsSlice';
import { countCartTotal } from './features/CartFeature/cartSlice';
import { filterProducts, loadProducts, sortProducts } from './features/FilterFeature/filterSlice';



function App() {
  const dispatch = useDispatch();
  const {cart} = useSelector((store)=>store.cart)
  const {products} = useSelector((store)=>store.products)
  const {sort, filters} = useSelector((store)=>store.filter)

  useEffect(()=>{
    dispatch(fetchProducts())
    // eslint-disable-next-line
  },[])

  useEffect(()=>{
    dispatch(loadProducts(products))
    // eslint-disable-next-line
  },[products])

  useEffect(()=>{
    dispatch(filterProducts())
    dispatch(sortProducts())
    // eslint-disable-next-line
  },[products,sort,filters])

  useEffect(()=>{
    dispatch(countCartTotal())
    localStorage.setItem('cart',JSON.stringify(cart))
    // eslint-disable-next-line
  },[cart])

  return (
    <AuthWrapper>
      <Router>
        <Navbar/>
        <Sidebar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/about' element={<About/>}/>
          <Route exact path='/cart' element={<Cart/>}/>
          <Route exact path='/products' element={<Products/>}/>
          <Route exact path='/products/:id' element={<SingleProduct/>}/>
          <Route exact path='/checkout' element={<PrivateRoute><CheckOut/></PrivateRoute>}/>
          <Route exact path='*' element={<Error/>}/>
        </Routes>
        <Footer/>
      </Router>
    </AuthWrapper>
    
  )
}

export default App
