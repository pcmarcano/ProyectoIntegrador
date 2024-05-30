import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import LockResetIcon from "@mui/icons-material/LockReset";

const UserInfo = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

const UserDetails = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
    marginTop: theme.spacing(1),
  },
}));

const Dashboard = () => {
  const user = {
    avatarUrl: "https://via.placeholder.com/150",
    username: "john_doe",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 555-5555",
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Mi Perfil
      </Typography>
      <UserInfo>
        <Avatar
          alt={user.username}
          src={user.avatarUrl}
          sx={{ width: 80, height: 80 }}
        />
        <UserDetails>
          <Typography variant="h6">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography color="textSecondary">@{user.username}</Typography>
          <Typography color="textSecondary">{user.email}</Typography>
          <Typography color="textSecondary">{user.phone}</Typography>
        </UserDetails>
      </UserInfo>
      <Grid container justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          startIcon={<LockResetIcon />}
        >
          Cambiar Contraseña
        </Button>
      </Grid>
    </Container>
  );
};

export default Dashboard;
