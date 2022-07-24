import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authServices from '../../../services/auth.services'
import { FaUser } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { BsGear } from 'react-icons/bs'


function DashBoard__NavigateBar() {

    async function getUser(info) {
        let user = await authServices.getUser()
        console.log(user)

        if (info === 'username') {
            return user.username.toString()
        } else if (info === 'avatar') {
            return user.image
        } else if (info === 'email') {
            return user.email
        } else if (info === 'token') {
            return user.token
        } else if (info === 'id') {
            return user.id
        } else if (info === 'role') {
            return user.role
        }
    }

    let navigate = useNavigate()

    async function logout() {
        await authServices.logout()
        navigate('/auth/login')
        console.log("Logged out")
    }

    const [dropstate, setDropstate] = useState(false)

    function dropMenu() {    
        setDropstate(dropstate === false ? true : false)
    }

    let menuClass = ["dropDown__options "]

    if(dropstate) {
        menuClass.push("dropDown__options--active")
    } else {
        menuClass.push("")
    }

    return (
        <nav>

            <div className="navContainer">
                <ul>
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/">Productos</Link>
                    </li>
                    <li>
                        <Link to="/">Administración</Link>
                    </li>
                </ul>

                <div className="dropDownProfile">
                    <div className="dropDown__user" onClick={() => {
                        dropMenu()
                    }}>
                        <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt="profile" />
                        {/* <FaUser /> */}
                        <span>
                            Pepe Perez
                        </span>
                    </div>
                    <div className={menuClass.join(" ")}>
                        <Link to="/">
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


                {/* 
                <div className="profileInfo">
                    <ul className='navBar_DropDown'>
                        <li>
                            <ul className='navBar_DropDown__Into'>
                                <li>
                                    <Link to="/">
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        <MdLogout />
                                        <p>Cerrar sesión</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        <BsGear />
                                        <p>Configuración</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        {/* <li>
                            <Link to="/">
                                <p>
                                    <span>
                                        <FaUser/>
                                    </span>
                                </p>
                            </Link>
                        </li> }
                    </ul>
                </div> */}
            </div>
        </nav>
    )
}

export default DashBoard__NavigateBar