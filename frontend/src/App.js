import HeaderBar from "./components/Navbar/Navbar";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="top-center" />
      <HeaderBar />
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </>
  );
}

export default App;
