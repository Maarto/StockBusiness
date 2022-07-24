import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import authServices from '../../../services/auth.services'

function LoginForm() {


    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState("");
    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await authServices.login(username, password).then((response) => {
                navigate('/dashboard');
            },
                (error) => {

                    console.log(error);

                    if(error.response.data === 'Invalid password'){
                        setError('Usuario o Contraseña inválidas')
                    }
                }
            )
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="login__container">
            <div className="login__form">
                <h1>Dashboard</h1>
                <form>
                    <label>Usuario</label>
                    <input type="text" placeholder="Username" onChange={(e) => {
                        setUsername(e.target.value)
                    }} />
                    <label>Contraseña</label>
                    <input type="password" placeholder="Password" onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                    <button type="submit" onClick={(e) => { handleSubmit(e) }}>Ingresar</button>
                    {error ? <p className="login_error_misspassword">{error}</p> : null}
                </form>
            </div>
        </div >
    )
}

export default LoginForm;