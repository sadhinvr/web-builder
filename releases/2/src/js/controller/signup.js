import axios from "axios";
import {
    setCookie
} from "../utils/cookie";
import { formMessage } from "../views/formMessageView";
import formLoading from "./formLoading";
import {
    getUserData
} from "./userdata";

const signup = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);

    formLoading()

    const jsonData = {};
    formData.forEach((value, key) => jsonData[key] = value);

    let url = '',
        add = '/user/signup';

    try {
        url = 'https://webflow-back-end.herokuapp.com'
        const cors = `https://cors-anywhere.herokuapp.com/`

        const id = await axios.post(url + add, jsonData).then().catch((err) => {
            if (err.response) {
                console.log(err.response.status);
            } else if (err.request) {
                console.log('request',err.request);
            } else {
                console.log(err);
            }
        })

        console.log(id)
        // console.log(formData)
        setCookie('sb_session', id.data, 365)
        formMessage('success',200)
        getUserData(id.data);
    } catch (err){
        formMessage('error',err.status)
        console.log('error signing up')
    }
    formLoading(false)

}

export {
    signup
}