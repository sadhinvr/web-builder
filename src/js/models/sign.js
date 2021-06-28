import {
    getUserData
} from "../controller/userdata";
import {
    getCookie
} from "../utils/cookie";
import {
    createSign
} from "../views/signView";

const signModel = () => {
    //check cookie
    const cookie = getCookie('sb_session');

    if (!cookie) {
        createSign('up');
    } else {
        getUserData(cookie);
    }
}

// signModel()

export default signModel;