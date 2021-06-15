import axios from "axios";
import {
    setCookie
} from "../utils/cookie";
import {
    getUserData
} from "./userdata";

const signup = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);

    const jsonData = {};
    formData.forEach((value, key) => jsonData[key] = value);

    let url = '',
        add = '/user/signup';

    try {
        url = 'https://webflow-back-end.herokuapp.com'
        const cors = `https://cors-anywhere.herokuapp.com/`

        const id = await axios.post(url + add, jsonData)

        console.log(id)
        // console.log(formData)
        setCookie('sb_session', id.data, 365)

        getUserData(id.data);
    } catch {
        console.log('error signing up')
    }
}

export {
    signup
}