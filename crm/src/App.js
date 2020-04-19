import React from 'react';
// import './App.css';
import Header from './components/Header'
import { MuiThemeProvider } from '@material-ui/core/styles';
import useStyles from './styles/Header';
import theme from './theme'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react'
import { islogged } from './services/UserService'
import { ConfirmationServiceProvider } from './services/ConfimationService';

function App(props) {
  useEffect(() => {
    islogged()
  }, [])
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <ConfirmationServiceProvider>
        <div className={classes.root}>
          <Header />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {props.children}
          </main>
        </div>
      </ConfirmationServiceProvider>
    </MuiThemeProvider>
  );
}

export default App;
