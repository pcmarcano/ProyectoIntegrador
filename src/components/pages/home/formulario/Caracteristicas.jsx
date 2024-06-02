import * as React from "react";
import PropTypes from "prop-types";
import useAutocomplete from "@mui/material/useAutocomplete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";

const Root = styled("div")(
  ({ theme }) => `
  color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
  };
  font-size: 14px;
  
`
);

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
  color: black;
`;

const InputWrapper = styled("div")(
  ({ theme }) => `
  width: 300px;
  border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    color: black;
  }

  &.focused {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: black;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span style={{ color: "black" }}>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
  };
  border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
);

const Listbox = styled("ul")(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;
    color: black;

    & span {
      flex-grow: 1;
      color: black;
    }

    & svg {
      color: black;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
    font-weight: 600;
    color: black;

    & svg {
      color: black;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
    cursor: pointer;
    color: black;

    & svg {
      color: black;
    }
  }
`
);

export default function Caracteristicas({ setCaracteristics }) {
  const [caracteristicas, setCaracteristicas] = React.useState([]);
  const [selectedCaracteristicas, setSelectedCaracteristicas] = React.useState(
    []
  );

  // Función para manejar el cambio de selección
  const handleSelectionChange = (event, values) => {
    setSelectedCaracteristicas(values);
    const selectedIds = values.map((category) => category.id);
    console.log(selectedIds);
    setCaracteristics(selectedIds);
  };

  // Obtiene las opciones de características
  const obtenerCategorias = async () => {
    try {
      const response = await fetch(
        "https://api.curso.spazioserver.online/caracteristicas/listar",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCaracteristicas(data);
      } else {
        console.error("Error en la solicitud HTTP GET:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud HTTP GET:", error);
    }
  };

  React.useEffect(() => {
    obtenerCategorias();
  }, []);

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    defaultValue: [],
    multiple: true,
    options: caracteristicas,
    getOptionLabel: (option) => option.nombre,
    onChange: handleSelectionChange, // Agrega el manejador de eventos onChange
  });

  return (
    <Root>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>Caracteristicas</Label>
        <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
          {value.map((option, index) => (
            <StyledTag label={option.nombre} {...getTagProps({ index })} />
          ))}
          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {focused && caracteristicas.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {caracteristicas.map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option.nombre}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
}
