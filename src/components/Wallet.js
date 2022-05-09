import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import UserContext from "./../contexts/UserContext";

import API_LINK from "../data/links";

function Wallet() {

    const { user } = useContext(UserContext);

    const [wallet, setWallet] = useState(null);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };

        const promise = axios.get(`${API_LINK}/operations`, config);

        promise.then((response) => {
            const { data } = response;

            setWallet(data);
        });

        promise.catch((error) => {
            const { status, data } = error.response;
            alert(`Não foi possível recuperar as operações do usuário.
            Erro ${status}: ${data} `);
        })
    }, []);


    let alignOperations = "center";

    function setOperationsSection() {
        if (wallet === null) {
            return <ThreeDots color="gray" height={13} width={51} />;
        }
        else if (wallet.operations.length === 0) {
            return <span>Não há registros de <br />entrada ou saída</span>
        }
        else {

            alignOperations = "space-between";

            let balanceColor = null;
            if(wallet.balance >= 0) {
                balanceColor = "#03AC00";
            }
            else {
                balanceColor = "#C70000";
            }

            return (
                <>
                    <Registers>
                        {wallet.operations.map((operation, index) => {
                            let colorOperation = null;
                            if (operation.type === "incoming") {
                                colorOperation = "#03AC00";
                            }
                            else {
                                colorOperation = "#C70000";
                            }

                            return (

                                <Operation key={index} color={colorOperation}>
                                    <div>
                                        <span className="date">{operation.date}</span>
                                        <span className="description"> {operation.description}</span>
                                    </div>

                                    <div>
                                        <span className="value"> {operation.value.toFixed(2).replace(".", ",")}</span>
                                    </div>
                                </Operation>
                            )
                        })}
                    </Registers>
                    <Balance color={balanceColor}>
                        <span className="text">SALDO</span>
                        <span className="value">{wallet.balance.toFixed(2).replace(".", ",")}</span>  
                    </Balance>
                </>
            )
        }
    }

    const operationsSectionContent = setOperationsSection();

    console.log(wallet);

    return (
        <>
            <Header>
                <div>
                    <h1>{`Olá, ${user.name}`}</h1>
                    <ion-icon name="log-out-outline"></ion-icon>
                </div>
            </Header>

            <Operations align={alignOperations}>
                {operationsSectionContent}
            </Operations>

            <Footer>
                <div>
                    <button>
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <span>Nova entrada</span>
                    </button>

                    <button>
                        <ion-icon name="remove-circle-outline"></ion-icon>
                        <span>Nova saída</span>
                    </button>
                </div>
            </Footer>
        </>
    );
}

export default Wallet;

const Header = styled.header`
    display: flex;
    justify-content: center;
    
    padding-top: 25px;
    padding-bottom: 22px;

    div{
        width: 326px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1 {
            font-weight: 700;
            font-size: 26px;
            line-height: 31px;
            color: #FFFFFF;
        }

        ion-icon{
            color: #FFFFFF;
            font-weight: bold;
            font-size: 24px;

            cursor: pointer;
        }
    }
`;

const Operations = styled.section`
    margin: 0 auto;

    width: 326px;
    height: 446px;

    background: #FFFFFF;
    border-radius: 5px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: ${(props) => props.align};

    span {
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-align: center;

        color: #868686;
    }
`;

const Registers = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;

    margin-top: 15px;

    height: 90%;
`;

const Operation = styled.div`
    display: flex;
    justify-content: space-between;
    
    margin-top: 5px;
    

    div{
        .date{
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;

            color: #C6C6C6;

            margin-left: 12px;
        }

        .description {
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;

            color: #000000;

            margin-left: 5px;
        }

        .value {
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            text-align: right;

            color:  ${(props) => props.color};

            margin-right: 11px;
        }
    }
`;

const Balance = styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;
    margin-bottom: 10px;

    .text {
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;

        color: #000000;

        margin-left: 12px;
    }

    .value {

        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        text-align: right;
        
        color:  ${(props) => props.color};
        margin-right: 11px;
    }
`;

const Footer = styled.footer`
    display: flex;
    justify-content: center;
    
    padding-top: 13px;

    div{
        width: 326px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        button{
            width: 155px;
            height: 114px;

            background: #A328D6;
            border-radius: 5px;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;

            ion-icon{
                font-size: 25px;
                color: #FFFFFF;

                margin-left: 5px;
                margin-top: 5px;
            }

            span{
                width: 65px;

                font-weight: 700;
                font-size: 17px;
                line-height: 20px;
                text-align: left;
                color: #FFFFFF;

                margin-left: 10px;
                margin-bottom: 10px;
            }
        }
    }
`;