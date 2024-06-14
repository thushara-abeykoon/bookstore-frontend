import axios from "axios"
import { LOGIN_URL, REGISTER_URL } from "./apiUrl";

export default class RequestHandler {
    token;
    constructor(token) {
        this.token = token;
    }

    tokenNullError(){
        if(this.token === null)
            throw new Error("Can't make any request due to null token");
    }

    getReq = async( url, callBack ) => {
        this.tokenNullError();
        await axios.get(url, {headers: { Authorization: `Bearer ${this.token}` }})
        .then(res=>callBack(res))
        .catch(err=>console.error(err))
    }

    postReq = async( url, data, callBack ) => {
        this.tokenNullError();
        await axios.post(url, data, { headers: { Authorization: `Bearer ${this.token}` } })
        .then(res => callBack(res))
        .catch(err=>console.error(err));
    }

    putReq = async( url, data, callBack ) => {
        this.tokenNullError();
        await axios.put(url, data, { headers: { Authorization: `Bearer ${this.token}` } } )
        .then(res => callBack(res))
        .catch(err => console.error(err));
    }

    deleteReq = async( url, callBack ) => {
        this.tokenNullError();
        await axios.delete( url, { headers: { Authorization: `Bearer ${this.token}` } })
        .then(res => callBack(res))
        .catch(err=>console.error(err));
    }
}

export const loginReq = async(user, callBack, handleError) => { 
    await axios.post(LOGIN_URL, user)
    .then(res=>callBack(res))
    .catch(err=>handleError(err));
}

export const registerReq = async(user, callBack, handleError) => {
    await axios.post(REGISTER_URL, user)
    .then(res=>callBack(res))
    .catch(err=>handleError(err));
}