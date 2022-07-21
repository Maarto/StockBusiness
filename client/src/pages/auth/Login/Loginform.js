import React from "react";
// import useAxios from "../../../utils/AxiosUt";

function LoginForm() {

    return (
        <>
            <div className="login__container">
                <div className="login__form">
                    <form>
                        <label>Usuario / Email</label>
                        <input type="text" placeholder="Username"/>
                        <label>Contraseña</label>
                        <input type="password" placeholder="Password"/>
                        <button type="submit">Ingresar</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginForm;