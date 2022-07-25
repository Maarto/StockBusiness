import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authServices from '../../../services/auth.services'
import { FaUser } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { BsGear } from 'react-icons/bs'
import Spinner from '../../spinner/spinner'
import profileImageTesting from '../../../assets/images/MartotestingIMG.jpg'


function DashBoard__NavigateBar({ enableNavigate }) {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [dropstate, setDropstate] = useState(false)

    async function getUser() {
        let user = await authServices.getUser()
        console.log(user)
        setUser(user)
        setLoading(false)
    }

    let navigate = useNavigate()

    async function logout() {
        await authServices.logout()
        navigate('/auth/login')
        console.log("Logged out")
    }


    function dropMenu() {
        setDropstate(dropstate === false ? true : false)
    }

    let menuClass = ["dropDown__options "]

    if (dropstate) {
        menuClass.push("dropDown__options--active")
    } else {
        menuClass.push("")
    }

    useEffect(() => {
        if (loading) {
            getUser();
        }
    }, [])

    if (!enableNavigate) {
        return <></>
    } else {
        return (
            <>
                {
                    loading ? <Spinner loading={loading} /> :
                        <nav>

                            <div className="navContainer">
                                <ul>
                                    <li>
                                        <Link to="/dashboard">Inicio</Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/products">Productos</Link>
                                    </li>
                                    <li>
                                        <Link to="/">Administración</Link>
                                    </li>
                                </ul>

                                <div className="dropDownProfile">
                                    <div className="dropDown__user" onClick={() => {
                                        dropMenu()
                                    }}>
                                        <img src={profileImageTesting} alt="profile" width="10rem" height="10rem" />
                                        <div className="dropDown__profileInfo">

                                            <span>
                                                {user.name + " " + user.surname}
                                            </span>
                                            <p className='role'>
                                                {user.role[0]}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={menuClass.join(" ")}>
                                        <Link to="/dashboard/profile/config">
                                            <BsGear />
                                            <span>Configuración</span>
                                        </Link>
                                        <Link to="#" onClick={() => {
                                            logout();
                                        }}>
                                            <MdLogout />
                                            <span>Cerrar Sesión</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </nav>
                }

            </>
        )
    }

}

export default DashBoard__NavigateBar