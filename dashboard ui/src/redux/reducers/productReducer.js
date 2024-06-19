// import { ADD_PRODUCT, REMOVE_PRODUCT } from '../actions/productAction';
 const initialState = {
  products: []
 }

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        // ...state,
        products: action.payload
        // products: products.push(action.payload)
      };

    case "REMOVE_PRODUCT":
      return {
        // ...state,
        products: []
      };

    default:
      return state;
  }
}

export default productReducer;