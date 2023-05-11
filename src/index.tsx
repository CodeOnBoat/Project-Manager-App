import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <AppContextProvider>
      <GoogleOAuthProvider clientId="762061531167-o1tqca7rja91utkm1lm0et54jsu7ah0g.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </AppContextProvider>
  </BrowserRouter>
);
