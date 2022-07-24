import React from 'react'
import { Navigate } from 'react-router-dom'


function DashBoard__NavigateBar() {
    return (
        <div>
            <Navigate to="/dashboard/homepage" />
        </div>
    )
}

export default DashBoard__NavigateBar