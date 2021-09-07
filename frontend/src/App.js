import { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderBar from "./components/Navbar/Navbar";
import { Route, Switch, useParams, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BecomeSeller from "./components/Seller/BecomeSeller";
import PageNotFound from "./components/UI/PageNotFound/PageNotFound";
import AddItems from "./components/Seller/AddItems";
import { Context } from "./context";
import Item from "./components/Item/Item";
import Cart from "./components/Cart/Cart";

function App() {
  const { state } = useContext(Context);
  return (
    <>
      <ToastContainer position="top-center" />
      <HeaderBar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/item/:itemId" component={Item} exact />
        {state.user ? (
          <>
            <Route path="/become-seller" component={BecomeSeller} exact />
            <Route path="/add-items" component={AddItems} exact />
            <Route path="/cart" exact component={Cart} />
          </>
        ) : null}
        <Route path="*" component={PageNotFound} exact />
      </Switch>
    </>
  );
}

export default App;
