// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import { loginUser, registerUser, logoutUser } from '../redux/actions/userAction';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

// jest.mock('react-router-redux', () => ({
//     push: jest.fn(args => ({ type: '@@router/CALL_HISTORY_METHOD', payload: { method: 'push', args } })),
// }));

// describe.skip('User action component', () => {
//     test('should dispatch LOGIN_USER action and redirect to "/" after login', () => {
//         const user = {};
//         const expectedActions = [
//             { type: 'LOGIN_USER', payload: user },
//             { type: '@@router/CALL_HISTORY_METHOD', payload: { method: 'push', args: ['/'] } },
//         ];
//         const store = mockStore({});
//         store.dispatch = jest.fn(action => {
//             expectedActions.push(action);
//             return action;
//         });
//         store.dispatch(loginUser(user));
//         expect(store.dispatch).toHaveBeenCalledTimes(2);
//         expect(store.getActions()).toEqual(expectedActions);
//     });

//     test('should dispatch REGISTER_USER action and redirect to "/" after registration', () => {
//         const user = {};
//         const expectedActions = [
//             { type: 'REGISTER_USER', payload: user },
//             { type: '@@router/CALL_HISTORY_METHOD', payload: { method: 'push', args: ['/'] } },
//         ];
//         const store = mockStore({});
//         store.dispatch(registerUser(user));
//         expect(store.getActions()).toEqual(expectedActions);
//     });

//     test('should dispatch LOGOUT_USER action and redirect to "/" after logout', () => {
//         const expectedActions = [
//             { type: 'LOGOUT_USER' },
//             { type: '@@router/CALL_HISTORY_METHOD', payload: { method: 'push', args: ['/'] } },
//         ];
//         const store = mockStore;
//         store.dispatch(logoutUser());
//         expect(store.getActions()).toEqual(expectedActions);
//     });
// });



import { loginUser, logoutUser } from '../redux/actions/userAction';

describe('userActions', () => {
  test('should create an action to log in a user', () => {
    const user = { username: 'test', password: '123456' };
    const expectedAction = {
      type: 'LOGIN_USER',
      payload: user,
    };
    expect(loginUser(user)).toEqual(expectedAction);
  });

  test('should create an action to log out a user', () => {
    const expectedAction = {
      type: 'LOGOUT_USER',
    };
    expect(logoutUser()).toEqual(expectedAction);
  });
});