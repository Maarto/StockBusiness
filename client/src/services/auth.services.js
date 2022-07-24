import axios from 'axios';

async function login(username, password){
    return axios.post('http://localhost:4000/auth/login', {
        username: username,
        password: password
    }).then(res => {
        if(res.data){

            // console.log(res)

            let newUserOBJ = {
                username: res.data.data.user.username,
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

async function logout(){
    localStorage.removeItem('user')
}

const authServices = {
    login,
    logout,
    getUser
};

export default authServices;