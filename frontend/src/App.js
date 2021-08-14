import HeaderBar from "./components/Navbar/Navbar";
import { Route, Switch, useParams, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BecomeSeller from "./components/Seller/BecomeSeller";

function App() {
  return (
    <>
      <ToastContainer position="top-center" />
      <HeaderBar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/become-seller" component={BecomeSeller} exact />
      </Switch>
    </>
  );
}

export default App;
