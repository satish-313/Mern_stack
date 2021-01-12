import React, { createContext, useReducer } from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {
  user: null
}

if(localStorage.getItem('jwt-token')){
  const decodetoken = jwtDecode(localStorage.getItem('jwt-token'))
  // console.log(decodetoken)

  if(decodetoken.exp * 1000 < Date.now()){
    localStorage.removeItem('jwt-token')
  }
  else{
    initialState.user = decodetoken
  }
}

const AuthContext = createContext({
  user: null,
  login: (userdata) => {},
  logout: () => {}
})

function authReducer(state,action){
  switch(action.type){
    case 'LOGIN':
      return {...state, user: action.payload}
    case 'LOGOUT':
      return {...state, user: null}
    default:
      return state
  }
}

function AuthProvider(props){
  const [state,dispacth] = useReducer(authReducer,initialState)

  const login = (userdata) => {
    localStorage.setItem('jwt-token',userdata.token)
    dispacth({
      type: 'LOGIN', payload: userdata
    })
  }

  const logout = () => {
    localStorage.removeItem('jwt-token')
    dispacth({
      type: 'LOGOUT'
    })
  }

  return(
    <AuthContext.Provider value={{ user: state.user, login ,logout}} {...props} />
  )
}

export {AuthProvider, AuthContext}