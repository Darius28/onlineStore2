import { useContext, useEffect } from "react";
import HeaderBar from "./components/Navbar/Navbar";
import { Route, Switch, useParams, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BecomeSeller from "./components/Seller/BecomeSeller";
import PageNotFound from "./components/UI/PageNotFound/PageNotFound";
import AddItems from "./components/Seller/AddItems";
import { Context } from "./context";

function App() {
  const { state } = useContext(Context);
  console.log(state);
  return (
    <>
      <ToastContainer position="top-center" />
      <HeaderBar />
      <Switch>
        <Route path="/" component={Home} exact />
        {state.user ? (
          <>
            <Route path="/become-seller" component={BecomeSeller} exact />
            <Route path="/add-items" component={AddItems} exact />
          </>
        ) : null}
        <Route path="*" component={PageNotFound} exact />
      </Switch>
    </>
  );
}

export default App;
