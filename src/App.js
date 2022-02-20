
import {Route,Routes} from 'react-router-dom';
import Header from './components/Header';
import './App.css';
import HomePage from './Pages/Homepage';
import Coin from './Pages/Coins';
import { makeStyles } from '@material-ui/core';


function App() {

  //HOW TO USE MATERIAL UI CUSTOM STYLE CLASSES

  const useStyles = makeStyles(() => ({

    App:{
      backgroundColor:'#14161a',
      color:"white",
      minHeight: '100vh'
    }

  }))

  const classes  = useStyles();

  return (
  <div className={classes.App}>
  <Header/>
  <Routes>
  <Route path='/' exact element={<HomePage/>} />
  <Route path='/coins/:id'element={<Coin/>} />
  </Routes>
  </div>
  );
}

export default App;
