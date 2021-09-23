import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

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
import OrderSuccess from "./components/UI/OrderSuccess/OrderSuccess";
import { BackendUrl } from "./utils/BackendUrl";
import Wishlist from "./components/Wishlist/Wishlist";
import Order from "./components/Order/Order";

function App() {
  const { state, dispatch } = useContext(Context);
  const history = useHistory();
  console.log("styate in app.js: ", state.user);
  const getSessionStatus = async (uid) => {
    console.log("get session status in app.js");
    const { data } = await axios.post(`${BackendUrl}/get-session-status`, {
      userId: uid,
    });

    if (data.ok === false) {
      console.log("session expired");

      dispatch({
        type: "LOGOUT",
      });
      localStorage.removeItem("user");
      const { data } = await axios.post(`${BackendUrl}/logout`, {
        userId: uid,
      });
      history.replace("/");
    }
  };

  useEffect(() => {
    const LS = JSON.parse(localStorage.getItem("user"));
    console.log("app.js ue ");
    if (LS) {
      console.log("yuserkjshdak");
      const userId = LS._id;
      if (!state.user) {
        getSessionStatus(userId);
      }
    }
  }, []);
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
            <Route path="/order-success" exact component={OrderSuccess} />
            <Route path="/orders" exact component={Order} />
            <Route path="/wishlist" exact component={Wishlist} />
          </>
        ) : null}
        <Route path="*" component={PageNotFound} exact />
      </Switch>
    </>
  );
}

export default App;
