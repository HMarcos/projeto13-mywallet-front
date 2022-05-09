import { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from "react-loader-spinner";


import UserContext from '../contexts/UserContext';

import API_LINK from '../data/links';

export default function OutgoingPayment() {
    const [operation, setOperation] = useState({
        description: "",
        value: ""
    });

    const {user} = useContext(UserContext);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function submit(event){
        event.preventDefault();

        setLoading(true);

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };

        const body = {
            type: "outgoing",
            value: Number(parseFloat(operation.value.replace(",", ".")).toFixed(2)),
            description: operation.description
        }

        const promise = axios.post(`${API_LINK}/operations`,body, config);

        promise.then((response) => {
            alert("Operação realizada com sucesso...");
            navigate("/wallet");
        });

        promise.catch((error) => {
            const { status, data } = error.response;
            console.log(error);
            alert(`Não foi possível realizar a operação.
             ${status}: ${data} `);

            setLoading(false);
        });

    }

    const submitButton = loading ? <ThreeDots color="white" height={13} width={51} /> : "Salvar saída";

    return (
        <>
            <Header>
                <div>
                    <h1>Nova saída</h1>
                </div>
            </Header>

            <Form onSubmit={submit}>
                <input
                    type="text"
                    placeholder="Valor"
                    required
                    pattern='^[0-9]+,[0-9]{2}$'
                    title='Insira um valor com duas "," e duas casas decimais. Ex: 45,87'
                    disabled={loading}
                    value={operation.value}
                    onChange={(event) => setOperation({ ...operation, value: event.target.value })}
                >
                </input>

                <input
                    type="text"
                    placeholder="Descrição"
                    required
                    disabled={loading}
                    value={operation.description}
                    onChange={(event) => setOperation({ ...operation, description: event.target.value })}
                >
                </input>

                <button type="submit" disabled={loading}>
                    {submitButton}
                </button>
            </Form>

        </>
    )
};

const Header = styled.header`
    display: flex;
    justify-content: center;
    
    padding-top: 25px;
    padding-bottom: 40px;

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
    }
`;

const Form = styled.form`
    width: min-content;
    margin: 0 auto;
    input{
        width: 326px;
        height: 58px;

        font-weight: 400;
        font-size: 20px;
        line-height: 23px;

        background: #FFFFFF;
        border-radius: 5px;
        color: #000000;

        margin-bottom: 13px;

        padding-left: 15px;
    }

    input:disabled{
        background-color: #e3e1e1;
    }

    input::placeholder {
        color: #000000;
    }

    button {
        width: 326px;   
        height: 46px;

        background: #A328D6;
        border-radius: 5px;

        font-weight: 700;
        font-size: 20px;
        line-height: 23px;

        color: #FFFFFF;

        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    
`;