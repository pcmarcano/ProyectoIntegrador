import { Route, Routes } from "react-router-dom";
import Navbar from "../components/layout/navbar/Navbar";
import Footer from "../components/layout/footer/Footer.jsx";
import { routes } from "./routes.jsx";
import Login from "../components/pages/login/Login";
import Register from "../components/pages/register/Register";
import ForgotPassword from "../components/pages/forgotPassword/ForgotPassword";
import ListaFavoritos from "../components/pages/favoritos/ListaFavoritos";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<Navbar />}>
          {routes.map(({ id, path, Element }) => (
            <Route key={id} path={path} element={<Element />} />
          ))}
        </Route>
      
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* register  */}
        <Route path="/register" element={<Register />} />

        {/* forgot password  */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRouter;
