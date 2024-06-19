import { createStore } from 'redux';
import productReducer from '../redux/reducers/productReducer';

describe('Product Reducer', () => {
  test('should handle ADD_PRODUCT action', () => {
    const store = createStore(productReducer);
    store.dispatch({
      type: 'ADD_PRODUCT',
      payload: [{ id: 1, name: 'Test Product' }],
    });
    expect(store.getState().products).toEqual([{ id: 1, name: 'Test Product' }]);
  });

  test('should handle REMOVE_PRODUCT action', () => {
    const store = createStore(productReducer, {
      products: [{ id: 1, name: 'Test Product' }],
    });
    store.dispatch({
      type: 'REMOVE_PRODUCT',
    });
    expect(store.getState().products).toEqual([]);
  });

  test('should handle unknown action type', () => {
    const store = createStore(productReducer, {
      products: [{ id: 1, name: 'Test Product' }],
    });
    store.dispatch({
      type: 'UNKNOWN_ACTION',
    });
    expect(store.getState().products).toEqual([{ id: 1, name: 'Test Product' }]);
  });
});