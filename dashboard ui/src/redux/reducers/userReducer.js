const initialState = {
  jwtToken: '',
  username: '',
  isValid: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        jwtToken: action.payload.jwtToken,
        username: action.payload.username,
        isValid: action.payload.valid,
      }
    case 'LOGOUT_USER':
      return {
        jwtToken: '',
        username: '',
        isValid: false,
      };
    default:
      return state;
  }
};

export default userReducer;