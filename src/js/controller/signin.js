import axios from "axios";
import {
    setCookie
} from "../utils/cookie";

const signin = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);

    const jsonData = {};
    formData.forEach((value, key) => jsonData[key] = value);

    let url = '',
        add = '/user/signin',
        id;

    try {
        url = 'https://webflow-back-end.herokuapp.com'
        const cors = `https://cors-anywhere.herokuapp.com/`

        id = await axios.post(url + add, jsonData)
        console.log(id)
        setCookie('sb_session', id.data, 365)
        // console.log(formData)
    } catch {
        console.log('error signing up')
    }


}

export {
    signin
}