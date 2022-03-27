const axios = require("axios");

const baseUrl = "http://localhost:3000/user/";

const userService = {}

userService.get = ( () => {
    return axios.get(baseUrl + "getUser").then(res => res.data);
});

userService.getEmail = ((email) => {
    return axios.get(baseUrl + email).then(res => res.data);
});

userService.getById = ((id) => {
    return axios.get(baseUrl + "getUser/" + id).then(res => res.data);
});

userService.validPass = ((user) => {
    return axios.post(baseUrl + 'contrasenia', user).then(res => res.data);
})

userService.save = ((user) => {
    return axios.post(baseUrl + "registrar", user).then(res => res.data);
})

/*export class UserService {
    baseUrl = "http://localhost:3000/user/";
    get() {
        return axios.get(this.baseUrl + "getUser").then(res => res.data);

    }

    getEmail(email){
        return axios.get(this.baseUrl + email).then(res => res.data);
    }

    save(user) {
        return axios.post(this.baseUrl + "registrar", user).then(res => res.data);
    }


}*/

module.exports = userService;