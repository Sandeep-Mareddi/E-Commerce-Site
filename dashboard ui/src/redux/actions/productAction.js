export const addProduct = (product) => ({
    type: 'ADD_PRODUCT',
    payload: product,
  });
   
  export const removeProduct = () => ({
    type: 'REMOVE_PRODUCT',
  });