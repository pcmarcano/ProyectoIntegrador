import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import AuthContextComponent from "./components/context/AuthContext";
import { GlobalStateProvider } from "./components/context/Context";
import SearchContextComponent, {
  SearchContext,
} from "./components/context/SearchContext";
import WhatsAppChat from "./components/WhatsAppChat";

function App() {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <AuthContextComponent>
          <SearchContextComponent>
            <AppRouter />
            <WhatsAppChat 
              numeroFono="56997142272"  // Numero de telefono sin + ni espacios ni simbolos
              mensaje="" //mensaje que se va a colocar en campo de ingreso.... esta vacio para qu el usuario ingresa su propia consulta
            />
          </SearchContextComponent>
        </AuthContextComponent>
      </BrowserRouter>
    </GlobalStateProvider>
  );
}

export default App;
