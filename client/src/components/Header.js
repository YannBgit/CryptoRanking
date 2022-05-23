import {
  AppBar,Button,ButtonGroup,Container,MenuItem,Select,Toolbar,Typography,} from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import React, { createContext, useState } from 'react'
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: 'white',
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});


function Print_button(history) {  
  const [cookie_read] = useState(document.cookie)
  const [msg] = useState(cookie_read)
  if(!msg)
  {
    return( 
      <Button 
        style={{ width: 100, height: 40, marginRight: 25 }}
        onClick={() => history.push(`/Connexion`)}
        >
          Connexion
        <img src="https://img.icons8.com/fluency/48/000000/login-rounded-right.png"/>
      </Button>
    )
  }
  else
  {
    return( 
      <ButtonGroup>
        <Button 
          style={{ width: 300, height: 40, marginLeft: 15 }}
          onClick={() => history.push(`/Connexion`)} // go do setting
          >
            {msg}        
        </Button>
        <Button
          style={{ width: 100, height: 40, marginLeft: 15 }}
          onClick={() => history.push(`/Disconnect`)}
        >
          LOGOUT
      </Button>  
      </ButtonGroup>  
    )
  }
}

function Header() {
  const classes = useStyles();
  const { currency, setCurrency } = CryptoState();
  
  const history = useHistory();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => history.push(`/`)}
              variant="h6"
              className={classes.title}
            >
              Crypto Ranking
            </Typography>
            {Print_button(history)}
            {/* <Button color="inherit">Login</Button> */}
            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              style={{ width: 100, height: 40, marginLeft: 15 }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
