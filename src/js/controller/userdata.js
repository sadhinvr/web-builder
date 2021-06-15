import axios from "axios";
import {
    getCookie
} from "../utils/cookie";
import {
    b_URL
} from "../reuse";
import {
    createSign
} from "../views/signView";

const getUserData = async (sid) => {
    const add = `/user/data/${getCookie('sb_session')}`
    try {
        const data = await axios.get(b_URL + add).then().catch((err) => {
            if (err.response) {
                errResponse(err.response)
            } else if (err.request) {
                console.log(err.request);
            } else {
                console.log(err);
            }
        })
        console.log(data)
    } catch {
        console.log('error getting somedata')
    }
}

const errResponse = (r) => {
    if (r.status == 401) {
        createSign('in')
    }
}

export {
    getUserData
}