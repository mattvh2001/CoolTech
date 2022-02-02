//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import Login from './Components/Login'
import Register from './Components/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Repositories from './Components/Repositories';
import Division from './Components/Division';
import UserDivision from './Components/UserDivision'
import Links from './Components/Links';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Route exact = {true} path='/'>
          <Login />
      </Route>
      <Route exact = {true} path='/register'>
          <Register redirectToLogin = {false} />
      </Route>
     
        <Route exact = {true} path="/repos" component={Repositories}/>
        <Route exact = {true} path="/division" component={Division}/>
        <Route exact = {true} path="/userDivision" component={UserDivision}/>
      </BrowserRouter>
      
    </div>
  );
}
export default App;
