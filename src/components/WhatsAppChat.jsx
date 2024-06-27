import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
//import { Fab, makeStyles } from '@material-ui/core';
import { Fab } from '@mui/material';
import { styled } from '@mui/system';
import { ToastContainer, toast } from 'react-toastify';



const WhatsAppBoton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  width: 60,
  height: 60,
  bottom: 45,
  right: 15,
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
    try {
      const url = `https://wa.me/${numeroFono}?text=${encodeURIComponent(mensaje)}`;
      window.open(url, '_blank');
      toast.success('Mensaje enviado a través de WhatsApp.');
    } catch (error) {
      console.error('Error al enviar mensaje por WhatsApp:', error);
      toast.error('Ocurrió un error al intentar enviar el mensaje por WhatsApp. Por favor, inténtelo de nuevo más tarde.');
    }
  };


  return (
    <WhatsAppBoton onClick={handleClick} aria-label="WhatsApp">
      <WhatsAppIcon />
    </WhatsAppBoton>
    
  );
};

export default WhatsAppChat;
