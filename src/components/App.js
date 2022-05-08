import {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Reset } from "styled-reset";
import GlobalStyle from "./GlobalStyle";

import SignIn from "./SignIn";
import SignUp from "./SingUp";

import UserContext from "./../contexts/UserContext";

export default function App() {

    const [user, setUser] = useState({});

    return (
        <>
            <Reset />
            <GlobalStyle />
            <UserContext.Provider value={{user, setUser}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SignIn />}></Route>
                        <Route path="/register" element={<SignUp />}></Route>
                    </Routes>
                </BrowserRouter>
             </UserContext.Provider>
            
        </>
    );
}