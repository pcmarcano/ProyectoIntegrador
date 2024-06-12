import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import AuthContextComponent from "./components/context/AuthContext";
import { GlobalStateProvider } from "./components/context/Context";
import SearchContextComponent, {
  SearchContext,
} from "./components/context/SearchContext";

function App() {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <AuthContextComponent>
          <SearchContextComponent>
            <AppRouter />
          </SearchContextComponent>
        </AuthContextComponent>
      </BrowserRouter>
    </GlobalStateProvider>
  );
}

export default App;
