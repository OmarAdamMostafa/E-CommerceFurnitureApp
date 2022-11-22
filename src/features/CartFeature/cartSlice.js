import { createSlice} from '@reduxjs/toolkit';

const getLocalStorage = () =>{
    let cart = localStorage.getItem('cart')
    if(cart){
      return JSON.parse(localStorage.getItem('cart'))
    } 
    else{
      return []
    }
}

const initialState = {
  cart: getLocalStorage(),
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 534,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state,action) =>{
        console.log(action.payload);
        const {id,color,amount,product} = action.payload
        const tempItem = state.cart.find((item) => item.id === id + color) // .find() get the first element matching the condition

        if(tempItem){
            const tempCart = state.cart.map((cartItem)=>{ // .map() performs the function on every element of the array
                if(cartItem.id === id + color){
                let newAmount = cartItem.amount + amount
                if(newAmount > cartItem.max){
                    newAmount = cartItem.max
                }
                return {...cartItem, amount: newAmount}
                }
                else{
                return cartItem
                }
            })
            state.cart = tempCart
        }
        else{
            const newItem = {
                id: id + color,
                name: product.name,
                color,
                amount,
                image: product.images[0].url,
                price: product.price,
                max: product.stock
            }
            state.cart = [...state.cart, newItem]
        }
    },
    removeItem: (state,action) =>{
        const tempCart = state.cart.filter((item) => item.id !== action.payload)
        state.cart = tempCart
    },
    toggleAmount: (state,action) =>{
        const {id, value} = action.payload
        const tempCart = state.cart.map((item)=>{
            if(item.id === id){
                if(value === 'inc'){
                let newAmount = item.amount + 1
                if(newAmount > item.max){
                    newAmount = item.max
                }
                return {...item, amount: newAmount}
                }
                if(value === 'dec'){
                let newAmount = item.amount - 1
                if(newAmount < 1){
                    newAmount = 1
                }
                return {...item, amount: newAmount}
                }
            }
            return item
        })
        state.cart = tempCart
    },
    clearCart: (state) =>{
        state.cart = []
    },
    countCartTotal: (state) =>{
        const {totalAmount,totalItems} = state.cart.reduce((total,cartItem)=>{
            const {amount, price} = cartItem
            total.totalItems += amount
            total.totalAmount += price * amount

            return total
            }, {
            totalAmount:0,
            totalItems:0
        })
        state.totalAmount = totalAmount
        state.totalItems = totalItems
    }
},
});

export const {
  addToCart,
  removeItem,
  toggleAmount,
  clearCart,
  countCartTotal
} = cartSlice.actions;

export default cartSlice.reducer;
