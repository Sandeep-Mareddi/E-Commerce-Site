import axios from "axios";
import store from "../redux/store";
import { addProduct ,removeProduct } from "../redux/actions/productAction";

export default function addingProducts(){
    let state = store.getState();
    let jwtToken = state.UserReducer.jwtToken;
      // console.log(jwtToken);
      axios.get("http://localhost:8081/dashboard/products", {
        headers: {
          "Authorization": `Bearer ${jwtToken}`
        }
      }).then((response) => {
        let data = response.data;
        store.dispatch(addProduct(data));
      })
        .catch((error) => console.log(error));
}


export function removingProducts(){
    store.dispatch(removeProduct());
}