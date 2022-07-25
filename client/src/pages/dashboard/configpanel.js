import React from "react";
import Spinner from "../../components/spinner/spinner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../../services/auth.services";

function ProfileConfigutarion({ setEnableNavigate }) {


    let [loading, setLoading] = useState(true);
    let [name, setName] = useState("");
    let [surname, setSurname] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");

    async function getProfile() {
        let localAuthInfo = await authServices.getUser();
        let user = await authServices.getUserFromDB(localAuthInfo.id);
        setName(user.data.name);
        setSurname(user.data.surname);
        setEmail(user.data.email);
    }

    useEffect(() => {
        if (loading) {
            getProfile();
            setEnableNavigate(true);
            setLoading(false);
        }
    }, [])


    return (
        <>
            {
                loading ? <Spinner loading={loading} /> :

                    <div className="profile__configuration">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                        }}>

                            <h1>Configuración</h1>

                            <div className="profile__options">
                                <label>Nombre</label>
                                <input type="text" placeholder="Nombre" value={name} onChange={(e) => {
                                    setName(e.target.value)
                                }} />
                            </div>
                            <div className="profile__options">
                                <label>Apellido</label>
                                <input type="text" placeholder="Apellido" value={surname} onChange={(e) => {
                                    setSurname(e.target.value)
                                }} />
                            </div>
                            <div className="profile__options">
                                <label>Email</label>
                                <input type="email" placeholder="Email" value={email} onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                            </div>
                            <div className="profile__options">
                                <label>Contraseña</label>
                                <input type="password" placeholder="Contraseña" required={true} onChange={(e) => {
                                    setPassword(e.target.value)
                                }} />
                            </div>
                            <div className="profile__options">
                                <label>Confirmar Contraseña</label>
                                <input type="password" placeholder="Confirmar Contraseña" required={true} onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                }} />
                            </div>
                            <button type="submit">Guardar</button>
                        </form>
                    </div>
            }
        </>
    )

}

export default ProfileConfigutarion;