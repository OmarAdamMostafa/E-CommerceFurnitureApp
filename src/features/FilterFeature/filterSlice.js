import { createSlice} from '@reduxjs/toolkit';

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
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    loadProducts: (state,action) =>{
        let max_price = action.payload.map((p)=>p.price)
        max_price = Math.max(...max_price) // Used to get the highest price among all the product prices

        // We used spread operator because if we set both the default and filtered products to action, it won't allow the filtered products to be reset 
        // since they both point to the same place in the memory, therefore a spread operator was used to copy the value
        
        state.allProducts = [...action.payload]
        state.filteredProducts = [...action.payload]
        state.filters.maxPrice = max_price 
        state.filters.price = max_price
    },
    filterProducts: (state) =>{
        const {allProducts} = state
        let tempProducts = [...allProducts]
        const {text, category, company, color, price, shipping} = state.filters
        
        // Filtering by text
        if(text){
            tempProducts = tempProducts.filter((product)=>{
                return product.name.toLowerCase().startsWith(text)
            })
        }
        // Filtering by category
        if(category !== 'all'){
            tempProducts = tempProducts.filter((product)=>{
                return product.category === category
            })
        }
        // Filtering by company
        if(company !== 'all'){
            tempProducts = tempProducts.filter((product)=>{
                return product.company === company
            })
        }
        // Filtering by color
        if(color !== 'all'){
            tempProducts = tempProducts.filter((product)=>{
                return product.colors.find((c)=> c === color)
            })
        }
        // Filtering by price
        tempProducts = tempProducts.filter((product)=> product.price <= price)
        // Filtering by shipping
        if(shipping){
            tempProducts = tempProducts.filter((product)=>{
                return product.shipping === true
            })
        }
        state.filteredProducts = tempProducts
    },
    sortProducts: (state) =>{
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
        state.filteredProducts = tempProducts
    },
    setGridView: (state) =>{
        state.gridView = true
    },
    setListView: (state) =>{
        state.gridView = false
    },
    updateSort: (state,action) =>{
        const value = action.payload.value // Used to get the value of the input
        state.sort = value;
    },
    updateFilters: (state,action) =>{ 
        let name = action.payload.name;
        let value = action.payload.value;

        state.filters[name] = value
    },
    clearFilters: (state) =>{
        state.filters = {
            ...state.filters,
            text:'',
            company:'all',
            category:'all', 
            color:'all',
            price: state.filters.maxPrice,
            shipping:false
        }
    }
  },
});

export const {
  loadProducts,
  filterProducts,
  sortProducts,
  setGridView,
  setListView,
  updateFilters,
  updateSort,
  clearFilters
} = filterSlice.actions;

export default filterSlice.reducer;
