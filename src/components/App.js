import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Reset } from "styled-reset";
import GlobalStyle from "./GlobalStyle";

import SignIn from "./SignIn";
import SignUp from "./SingUp";
import Wallet from "./Wallet";
import IncomingPayment from "./IncomingPayment";
import OutgoingPayment from "./OutgoingPayment";

import UserContext from "./../contexts/UserContext";

export default function App() {

    const [user, setUser] = useState({
        name: "",
        token: ""
    });

    return (
        <>
            <Reset />
            <GlobalStyle />
            <UserContext.Provider value={{ user, setUser }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SignIn />}></Route>
                        <Route path="/register" element={<SignUp />}></Route>
                        <Route path="/wallet" element={<Wallet />}></Route>
                        <Route path="/incoming-payment" element={<IncomingPayment />}></Route>
                        <Route path="/outgoing-payment" element={<OutgoingPayment />}></Route>
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>

        </>
    );
}