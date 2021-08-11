import { useReducer, createContext } from "react";

const initialState = {
  showModal: null,
};

const Context = createContext();

const rootReducer = (state, action) => {
  switch (action.type) {
    case "MODAL_STATUS": {
      let value;
      console.log(state.showModal);
      if (state.showModal === null) {
        value = action.payload;
      } else {
        value = null;
      }
      return { ...state, showModal: value };
    }

    default:
      return state;
  }
};

const Provider = (props) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

export { Context, Provider };
