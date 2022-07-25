import axios from 'axios';

async function login(email, password){
    return axios.post('http://localhost:4000/auth/login', {
        email: email,
        password: password
    }).then(res => {
        if(res.data){

            // console.log(res)

            let newUserOBJ = {
                name: res.data.data.user.name,
                surname: res.data.data.user.surname,
                token: res.data.data.token,
                id: res.data.data.user._id,
                role: res.data.data.user.role
            }

            localStorage.setItem('user', JSON.stringify(newUserOBJ))
        }
        // console.log('auth services')
        return res;

    })
}

async function getUser(){
    return JSON.parse(localStorage.getItem('user'))
}

async function getUserFromDB(id) {
    return axios.get("http://localhost:4000/user/" + id).then(res => {
        return res.data;
    })
}

async function logout(){
    localStorage.removeItem('user')
}

const authServices = {
    login,
    logout,
    getUser,
    getUserFromDB
};

export default authServices;