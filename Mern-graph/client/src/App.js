import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css';

// pages
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import SinglePost from './Pages/SinglePost'

// components
import Menubar from './Components/Menubar'
import AuthRoute from './utils/AuthRoute'

// global context
import { AuthProvider } from './context/auth'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Menubar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/post/:postId" component={SinglePost}/>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
