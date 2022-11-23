import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { updateFilters, clearFilters } from '../features/FilterFeature/filterSlice'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const {
    allProducts,
    filters:{
      text,
      category,
      company,
      color,
      minPrice,
      maxPrice,
      price,
      shipping,
    }
  } = useSelector((store)=>store.filter)
  const dispatch = useDispatch()

  const categories = getUniqueValues(allProducts,'category')
  const companies = getUniqueValues(allProducts,'company')
  const colors = getUniqueValues(allProducts,'colors')

  const handleFilter = (e) => {
    let value;
    if(e.target.name === 'text'){ // Since the category part uses buttons which do not have values, Therefore each buttons textContent is used instead
      value = e.target.value
    }
    if(e.target.name === 'category'){ // Since the category part uses buttons which do not have values, Therefore each buttons textContent is used instead
      value = e.target.textContent
    }
    if(e.target.name === 'company'){ // Since the category part uses buttons which do not have values, Therefore each buttons textContent is used instead
      value = e.target.value
    }
    if(e.target.name === 'color'){ // Since the color part uses buttons which do not have values
      value = e.target.dataset.color
    }
    if(e.target.name === 'price'){ // This is done because after adjusting the price range, the actual price is set as a string instead of an int
      value = Number(e.target.value)
    }
    if(e.target.name === 'shipping'){
      value = e.target.checked
    }
     dispatch(updateFilters({name: e.target.name ,value}))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters())
  };
  
  return <Wrapper>
    <div className='content'>
      <form onSubmit={(e)=>e.preventDefault()}>
        {/* Search Input */}
        <div className='form-control'>
          {/* Name of the input must be same as in the state */}
          {/* {console.log('1')} */}
          <input type='text' name='text' placeholder='search' className='search-input' value={text} onChange={handleFilter}/>
        </div>
        {/* Categories */}
        <div className='form-control'>
          <h5>Category</h5>
          <div>
            {categories.map((c,index)=>{
              return <button key={index} onClick={handleFilter} name='category' type='button' className={`${category === c.toLowerCase() ? 'active' : null}`}>
                {c}
              </button>
            })}
          </div>
        </div>
        {/* Companies */}
        <div className='form-control'>
          <h5>Company</h5>
          <select name='company' className='company' value={company} onChange={handleFilter}>
            {companies.map((c,index)=>{
              return <option key={index} value={c}>{c}</option>
            })}
          </select>
        </div>
        {/* Colors */}
        <div className='form-control'>
          <h5>Colors</h5>
            <div className='colors'>
              {colors.map((c,index)=>{
                //console.log(color);
                if(c === 'all'){
                  return <button key={index} name='color' className={`${color === 'all' ? 'all-btn active' : 'all-btn'}`} data-color='all'  onClick={handleFilter} >
                    All
                  </button>
                }
                return <button key={index} name='color' className={`${color === c ? 'color-btn active' : 'color-btn'}`} data-color={c}  style={{background: c}} onClick={handleFilter}>
                  {color === c ? <FaCheck/> : null}
                </button>
              })}
            </div>
        </div>
        {/* Price */}
        <div className='form-control'>
          <h5>Price</h5>
          <p className='price'>{formatPrice(price)}</p>
          <input type='range' name='price' onChange={handleFilter} min={minPrice} max={maxPrice} value={price}/>
        </div>
        {/* Shipping */}
        <div className='form-control shipping'>
          <label htmlFor='shipping'>Free Shipping</label>
          <input type='checkbox' name='shipping' id='shipping' onChange={handleFilter} checked={shipping}/>
        </div>
      </form>
      <button type='button' className='clear-btn' onClick={handleSubmit}>Clear Filter</button>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
