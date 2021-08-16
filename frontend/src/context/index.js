import { useReducer, createContext, useEffect } from "react";

const initialState = {
  showModal: null,
  user: null,
};

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
    case "BECOME_SELLER": {
      return { ...state, user: { ...state.user, seller: true } };
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
  }, []);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

export { Context, Provider };
