import userReducer from '../redux/reducers/userReducer';

describe('userReducer', () => {
  const initialState = {
    jwtToken: '',
    username: '',
    isValid: false,
  };

  test('should handle LOGIN_USER action', () => {
    const action = {
      type: 'LOGIN_USER',
      payload: {
        jwtToken: 'sampleToken',
        username: 'sampleUser',
        valid: true,
      },
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual({
      jwtToken: 'sampleToken',
      username: 'sampleUser',
      isValid: true,
    });
  });

  test('should handle LOGOUT_USER action', () => {
    const action = {
      type: 'LOGOUT_USER',
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual({
      jwtToken: '',
      username: '',
      isValid: false,
    });
  });

  test('should return the current state for unknown action types', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});