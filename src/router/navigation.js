import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ShopIcon from "@mui/icons-material/Shop";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DeckIcon from "@mui/icons-material/Deck";

export const menuItems = [
  {
    id: "home",
    path: "/",
    title: "Inicio",
    Icon: HomeIcon,
  },
  {
    id: "formulario",
    path: "/form",
    title: "Crear Espacio",
    Icon: SaveAsIcon,
  },
  {
    id: "listado",
    path: "/list",
    title: "Espacios",
    Icon: DeckIcon,
  },
  /*   {
    id: "cart",
    path: "/cart",
    title: "Carrito",
    Icon: ShoppingCartCheckoutIcon,
  },
  {
    id: "userOrders",
    path: "/user-orders",
    title: "Mis compras",
    Icon: ShopIcon,
  }, */
];
