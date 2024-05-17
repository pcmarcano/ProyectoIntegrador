import { Card, CardActionArea, CardMedia } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Cards.css";

const CardGrande = ({ arrayFotos, onlyOne }) => {
  console.log(onlyOne);

  return (
    <div className="square3" style={{ padding: 0, margin: 0 }}>
      <Card
        sx={{
          width: onlyOne ? "25rem" : "50rem",
          height: "15rem",
          padding: 0,
          margin: 0,
          borderRadius: "0px",
        }}
      >
        <CardMedia
          component="img"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={arrayFotos.rutaFoto}
          alt="img"
        />
      </Card>
    </div>
  );
};

export default CardGrande;
