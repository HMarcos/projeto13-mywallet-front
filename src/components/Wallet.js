import { useContext, useState } from "react";
import styled from "styled-components";

import { ThreeDots } from "react-loader-spinner";

import UserContext from "./../contexts/UserContext";

function Wallet() {

    const { user } = useContext(UserContext);

    const [operations, setOperations] = useState(null);

    const alignOperations = "center";

    function setOperationsSection() {
        if (operations === null) {
            return <ThreeDots color="gray" height={13} width={51} />;
        }
        else if (operations.length === 0) {
            return <span>Não há registros de <br />entrada ou saída</span>
        }
    }

    const operationsSectionContent = setOperationsSection();

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