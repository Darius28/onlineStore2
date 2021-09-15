import { useReducer, createContext, useEffect } from "react";
import axios from "axios";
import { BackendUrl } from "../utils/BackendUrl";

const initialState = {
  showModal: null,
  user: null,
  cartLength: null,
};

// const getCartData = async () => {
//   const { data } = await axios.get(`${BackendUrl}/get-cart-length`, {
//     withCredentials: true,
//   });
//   console.log("data.cl", data.cartLength);
//   return data.cartLength;
// };

const Context = createContext();

const rootReducer = (state, action) => {
  switch (action.type) {
    case "MODAL_STATUS": {
      let value;
      if (state.showModal === null) {
        value = action.payload;
      } else {
        value = null;
      }
      return { ...state, showModal: value };
    }
    case "LOGIN": {
      return { ...state, user: action.payload };
    }
    case "SET_CART_LENGTH": {
      console.log("set cart length");
      return { ...state, cartLength: action.payload };
    }
    case "BECOME_SELLER": {
      return { ...state, user: { ...state.user, seller: true } };
    }
    case "NEW_CART_ITEM_TOTAL": {
      return {
        ...state,
        user: { ...state.user, total_cart_items: action.payload },
      };
    }
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

const Provider = (props) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(localStorage.getItem("user")),
    });

    const getCartData = async () => {
      const { data } = await axios.get(`${BackendUrl}/get-cart-length`, {
        withCredentials: true,
      });
      console.log("data.cl", data.cartLength);
      dispatch({
        type: "SET_CART_LENGTH",
        payload: data.cartLength,
      });
    };

    getCartData();
  }, []);

  // useEffect(() => {
  //   dispatch({
  //     type: "SET_CART_LENGTH",
  //   });
  // }, [state.user]);

  // useEffect(() => {
  //   const getCsrfToken = async () => {
  //     const { data } = await axios.get(`${BackendUrl}/get-csrf-token`);
  //     console.log(data.csrfToken);
  //     axios.defaults.headers["X-CSRF-Token"] = data.csrfToken;
  //   };
  //   getCsrfToken();
  // }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

export { Context, Provider };
