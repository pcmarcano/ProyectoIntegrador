import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const SpaceCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

const SpaceDetails = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  flexGrow: 1,
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
    marginTop: theme.spacing(1),
  },
}));

const Dashboard = () => {
  const spaces = [
    {
      id: 1,
      name: "Espacio 1",
      category: "Categoría A",
      description: "Descripción del Espacio 1",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Espacio 2",
      category: "Categoría B",
      description: "Descripción del Espacio 2",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Espacio 3",
      category: "Categoría C",
      description: "Descripción del Espacio 3",
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Listado de Espacios
      </Typography>
      {spaces.map((space) => (
        <SpaceCard key={space.id}>
          <Avatar
            alt={space.name}
            src={space.imageUrl}
            sx={{ width: 80, height: 80 }}
          />
          <SpaceDetails>
            <Typography variant="h6">{space.name}</Typography>
            <Typography color="textSecondary">{space.category}</Typography>
            <Typography color="textSecondary">{space.description}</Typography>
          </SpaceDetails>
          <Box>
            <IconButton color="primary" aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton color="secondary" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Box>
        </SpaceCard>
      ))}
    </Container>
  );
};

export default Dashboard;
