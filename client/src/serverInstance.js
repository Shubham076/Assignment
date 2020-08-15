import axios from "axios";


const instance = axios.create({
    // baseURL:"http://localhost:4000",
    baseURL:"https://assignment-reactjs.herokuapp.com"
    // baseURL:'http://localhost:4000'
})

export default instance;