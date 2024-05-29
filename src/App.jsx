import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import AuthContextComponent from "./components/context/AuthContext";
import { GlobalStateProvider } from "./components/context/Context";

function App() {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <AuthContextComponent>
          <AppRouter />
        </AuthContextComponent>
      </BrowserRouter>
    </GlobalStateProvider>
  );
}

export default App;
