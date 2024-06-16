
import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
//import { Fab, makeStyles } from '@material-ui/core';
import { Fab } from '@mui/material';
import { styled } from '@mui/system';

const WhatsAppBoton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  width: 60,
  height: 60,
  bottom: 40,
  right: 40,
  backgroundColor: '#25d366',
  color: '#FFF',
  borderRadius: 50,
  textAlign: 'center',
  fontSize: 30,
  boxShadow: '2px 2px 3px #999',
  zIndex: 100,
  '&:hover': {
    backgroundColor: '#128C7E',
  },
}));

const WhatsAppChat = ({ numeroFono, mensaje }) => {
  const handleClick = () => {
    const url = `https://wa.me/${numeroFono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <WhatsAppBoton onClick={handleClick} aria-label="WhatsApp">
      <WhatsAppIcon />
    </WhatsAppBoton>
  );
};

export default WhatsAppChat;

/*
const WhatsAppChat = ({ numeroFono, mensage }) => {
  const handleClick = () => {
    const url = `https://wa.me/${numeroFono}?text=${encodeURIComponent(mensage)}`;
    window.open(url, '_blank');
  };

  return (
    <Fab 
      color="primary" 
      aria-label="WhatsApp"
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#25D366',
      }}
    >
      <WhatsAppIcon />
    </Fab>
  );
};

export default WhatsAppChat;*/