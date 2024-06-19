// import axios from "axios";
// import "@testing-library/jest-dom/extend-expect";
// import addingProducts, { removingProducts } from "./yourModule"; // replace with the actual module path
// import store from "../redux/store";
// import { addProduct, removeProduct } from "../redux/actions/productAction";

// jest.mock("axios");
// jest.mock("../redux/store");

// describe("addingProducts", () => {
//     test("fetches successfully data from an API and dispatches addProduct action", async () => {
//     const data = {  };
//     const response = { data };
//     axios.get.mockResolvedValue(response);
//     store.getState.mockReturnValue({
//       UserReducer: {
//         jwtToken: "mockJwtToken"
//       }
//     });
//     const dispatchMock = jest.fn();
//     store.dispatch.mockImplementation(dispatchMock);
//     await addingProducts();
//     expect(axios.get).toHaveBeenCalledWith("http://localhost:8081/dashboard/products", {
//       headers: {
//         "Authorization": "Bearer mockJwtToken"
//       }
//     });
//     expect(dispatchMock).toHaveBeenCalledWith(addProduct(data));
//   });

//   test("handles errors and logs them to the console", async () => {
//     const error = new Error("Mock error");
//     axios.get.mockRejectedValue(error);
//     await addingProducts();
//     expect(console.log).toHaveBeenCalledWith(error);
//   });
// });

// describe("removingProducts", () => {
//   test("dispatches removeProduct action", () => {
//     const dispatchMock = jest.fn();
//     store.dispatch.mockImplementation(dispatchMock);
//     removingProducts();
//     expect(dispatchMock).toHaveBeenCalledWith(removeProduct());
//   });
// });

// Import jest to mock the console.log function
import { jest } from '@jest/globals'; 
// import axios from 'axios';
import addingProducts, { removingProducts } from '../components/productservice';
import store from '../redux/store';
import { addProduct, removeProduct } from '../redux/actions/productAction';
 
// Mock axios for testing
jest.mock('axios');
 
describe('addingProducts', () => {
  test('fetches data successfully from an API and dispatches addProduct action', async () => {
    const data = [{ id: 1, name: 'Product 1' }];
    const jwtToken = 'mockJwtToken';
 
    // Mock axios get method
    axios.get.mockResolvedValue({ data });
 
    // Mock getState method of the store
    store.getState = jest.fn(() => ({
      UserReducer: {
        jwtToken,
      },
    }));
 
    // Mock dispatch method of the store
    store.dispatch = jest.fn();
 
    // Call the function
    await addingProducts();
 
    // Assertions
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8081/dashboard/products', {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    expect(store.dispatch).toHaveBeenCalledWith(addProduct(data));
  });
 
  test('handles errors when fetching data from an API', async () => {
    // Mock axios get method to simulate an error
    axios.get.mockRejectedValue(new Error('Failed to fetch data'));
 
    // Mock getState method of the store
    store.getState = jest.fn(() => ({
      UserReducer: {
        jwtToken: 'mockJwtToken',
      },
    }));
 
    // Mock dispatch method of the store
    store.dispatch = jest.fn();
 
    // Mock console.log to avoid printing error messages during the test
    console.log = jest.fn();
 
    // Call the function
    await addingProducts();
 
    // Assertions
    expect(store.dispatch).not.toHaveBeenCalledWith(addProduct(expect.anything()));
    expect(console.log).toHaveBeenCalledWith(expect.any(Error));
  });
});
 
describe('removingProducts', () => {
  test('dispatches removeProduct action', () => {
    // Mock dispatch method of the store
    store.dispatch = jest.fn();
 
    // Call the function
    removingProducts();
 
    // Assertions
    expect(store.dispatch).toHaveBeenCalledWith(removeProduct());
  });
});