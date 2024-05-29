import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

const Usuario = () => {
  const { user, isLogged } = useContext(AuthContext);
  console.log(user);
  const firstLetter = user?.email ? user.email.charAt(0).toUpperCase() : "";

  const rolAdmin = import.meta.env.VITE_ADMIN;
  const navigate = useNavigate();
  return (
    <div
      style={{
        textAlign: "right",
        width: "100%",
        padding: "1rem",
        fontFamily: '"Dosis", sans-serif',
        fontWeight: 900,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLogged && (
        <>
          <div>
            <h4 style={{ fontWeight: 100 }}>
              Comunidad: <strong>{user.rol && "#537"}</strong>
            </h4>
            <h4 style={{ fontWeight: 100 }}>
              Usuario: <strong>{user.rol}</strong>
            </h4>
            <h4 style={{ fontWeight: 100 }}>
              Email: <strong>{user.email}</strong>
            </h4>
          </div>
          <div>
            <Avatar
              sx={{ bgcolor: "orange", margin: "1rem" }}
              alt="User Avatar"
              src="/broken-image.jpg"
            >
              {firstLetter}
            </Avatar>
          </div>
        </>
      )}
    </div>
  );
};

export default Usuario;
