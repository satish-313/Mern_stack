import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css';

// pages
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'

// components
import Menubar from './Components/Menubar'

function App() {
  return (
    <Router>
      <Container>
        <Menubar />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Container>
    </Router>
  );
}

export default App;
