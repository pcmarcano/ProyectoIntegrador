import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthContextComponent = ({ children }) => {
  const [userId, setUserId] = useState("");

  const [user, setUser] = useState(
      JSON.parse(localStorage.getItem("userInfo")) || {}
  );
  const [isLogged, setIsLogged] = useState(
      JSON.parse(localStorage.getItem("isLogged")) || false
  );

  const handleLogin = (userLogged) => {
    setUser(userLogged);
    setIsLogged(true);
    localStorage.setItem("userInfo", JSON.stringify(userLogged));
    localStorage.setItem("isLogged", JSON.stringify(true));
  };

  const handleLogoutContext = () => {
    setUser({});
    setIsLogged(false);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("isLogged");
  };

  useEffect(() => {
    const obtenerId = async () => {
      try {
        if (user.email) {
          const res = await axios.get(
              `https://api.curso.spazioserver.online/usuarios/email/${user.email}`
          ); // Reemplazar por url de aws
          console.log(res);
          const backId = res.data.id;
          setUserId(backId);
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerId();
  }, [user]);

  let data = {
    user,
    isLogged,
    handleLogin,
    handleLogoutContext,
    userId,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthContextComponent;