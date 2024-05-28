import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import { Sugar } from "react-preloaders2";
import Routes from "./Routes/Routes";
import { decodeToken } from "./core/utils/decodeToken";

function App() {
  const token = localStorage.getItem("token");
  const decodedToken = decodeToken(token);

  if (decodedToken != null) {
    if (decodedToken.payload.exp * 1000 < Date.now()) {
      toast.warn("نشست شما به پایان رسیده");
      localStorage.removeItem("token");
      localStorage.removeItem("employee");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
    }
  }

  return (
    <div className="App">
      <Sugar time={1800} background="#ff1949" color="#ffffff" />
      <ToastContainer />
      <Routes />
    </div>
  );
}

export default App;
