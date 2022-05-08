import { useState } from "react";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

export default function SignUp() {

    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    const [loading, setLoading] = useState(false);

    const registerButton = loading ? <ThreeDots color="white" height={13} width={51} /> : "Cadastrar";

    return (
        <Content>
            <Logo>MyWallet</Logo>
            <LoginForm>
                <input
                    type="text"
                    placeholder="Nome"
                    required
                    disabled={loading}
                    value={register.name}
                    onChange={(event) => setRegister({ ...register, name: event.target.value })}
                >
                </input>

                <input
                    type="email"
                    placeholder="E-mail"
                    required
                    disabled={loading}
                    value={register.email}
                    onChange={(event) => setRegister({ ...register, email: event.target.value })}
                >
                </input>

                <input
                    type="password"
                    placeholder="Senha"
                    required
                    disabled={loading}
                    value={register.password}
                    minLength={8}
                    onChange={(event) => setRegister({ ...register, password: event.target.value })}
                >
                </input>

                <input
                    type="password"
                    placeholder="Confirme a senha"
                    required
                    disabled={loading}
                    value={register.password}
                    minLength={8}
                    onChange={(event) => setRegister({ ...register, password_confirmation: event.target.value })}
                >
                </input>

                <button type="submit" disabled={loading}>
                    {registerButton}
                </button>
            </LoginForm>

            <Link to="/">
                <LoginLink>Já tem uma conta? Entre agora!</LoginLink>
            </Link>
        </Content>
    )
}

const Content = styled.main`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Logo = styled.h1`
    font-family: 'Saira Stencil One', cursive;
    color: #FFFFFF;

    font-weight: 400;
    font-size: 32px;
    line-height: 50px;

    margin-bottom: 24px;
`;

const LoginForm = styled.form`
    width: min-content;
    margin-bottom: 36px;
    
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

const LoginLink = styled.span`
    
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;


    color: #FFFFFF;

    
`;