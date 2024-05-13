import { Route, Routes } from "react-router-dom";
import Navbar from "../components/layout/navbar/Navbar";
import Footer from "../components/layout/footer/Footer.jsx";
import { routes } from "./routes.jsx";

const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route element={<Navbar />}>
                    {routes.map(({ id, path, Element }) => (
                        <Route key={id} path={path} element={<Element />} />
                    ))}
                </Route>
                <Route path="*" element={<h1>Not found</h1>} />
            </Routes>
            <Footer />
        </>
    );
};

export default AppRouter;
