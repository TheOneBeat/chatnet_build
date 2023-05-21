import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';


export const UserContext = createContext();

export function TheContextProvider(props) {
  const [themeState, setThemeState] = useState({
    logIn: false,
    SignUp: false,
  });

  const [colorState,setColorState] = useState("")

  const navigationTo = useNavigate();

  const socket = io('http://localhost:3001');

  const [token, setToken] = useState(sessionStorage.getItem("token") || "");


  useEffect(() => {
    if (token !== "") {
      navigationTo("/allblogs");
      navigationTo("/allblogs");
    } else {
      navigationTo("/");
    }
  }, [token]);


  const changeToken = (newToken) => {
    setToken(newToken);
  };

  const changeState = (e) => {
    const states = {
      logIn: { logIn: true, SignUp: false },
      SignUp: { logIn: false, SignUp: true },
      close: { logIn: false, SignUp: false },
    };

    setThemeState(states[e]);
  };

  return (
    <UserContext.Provider
      value={{ themeState, changeState, token, changeToken, socket,colorState,setColorState }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default TheContextProvider;
