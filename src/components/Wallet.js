import {useContext} from "react";

import UserContext from "./../contexts/UserContext";

function Wallet(){
    
    const {user} = useContext(UserContext);

    return (
        <h1>{user.name}</h1>
    );
}

export default Wallet;