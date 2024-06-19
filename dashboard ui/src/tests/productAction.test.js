// import { addProduct, removeProduct } from '../redux/actions/productAction';
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import { push } from 'react-router-redux';

// jest.mock('react-router-redux', () => ({
//   push: jest.fn(),
// }));

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

// describe.skip('Product Actions', () => {
//   test('should dispatch ADD_PRODUCT action and push to "/" on addProduct', () => {
//     const product = { id: 1, name: 'Test Product' };
//     const expectedActions = [
//       {
//         type: 'ADD_PRODUCT',
//         payload: product,
//       },
//     ];
//     const store = mockStore({});
//     store.dispatch(addProduct(product));
//     expect(store.getActions()).toEqual(expectedActions);
//     expect(push).toHaveBeenCalledWith('/');
//   });

//   test('should dispatch REMOVE_PRODUCT action and push to "/" on removeProduct', () => {
//     const expectedActions = [
//       {
//         type: 'REMOVE_PRODUCT',
//       },
//     ];
//     const store = mockStore({});
//     store.dispatch(removeProduct());
//     expect(store.getActions()).toEqual(expectedActions);
//     expect(push).toHaveBeenCalledWith('/');
//   });
// });

import { addProduct, removeProduct } from '../redux/actions/productAction';

describe('Product Actions', () => {
  test('addProduct action creator creates the correct action', () => {
    const product = { id: 1, pcsubtitle: 'Example Product', pctitle: 'test', pcdescription: 'sample test description' };
    const expectedAction = {
      type: 'ADD_PRODUCT',
      payload: product,
    };
    const action = addProduct(product);
    expect(action).toEqual(expectedAction);
  });

  test('removeProduct action creator creates the correct action', () => {
    const expectedAction = {
      type: 'REMOVE_PRODUCT',
    };
    const action = removeProduct();
    expect(action).toEqual(expectedAction);
  });
});