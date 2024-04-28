import axios from "axios";
import {getTokenFromLocalStorage} from "../helpers/localstorage.helper.ts";

const token: string = '';

 const  instance = axios.create({
    baseURL:'http://localhost:5000',
    headers:{
        Authorization:`Bearer ` + localStorage.getItem("token"),
        Accept:"*/*",
        "Content-Type":"application/json"
    },
    timeout:5000,

});

export default instance;
